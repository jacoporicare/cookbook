import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { Alert, Color } from '@material-ui/lab';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import DocumentTitle from '../components/common/DocumentTitle';
import PageHeading from '../components/common/PageHeading';
import Spinner from '../components/common/Spinner';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useMeQuery,
  useResetPasswordMutation,
  UserFragment,
  useUpdateUserMutation,
  useUserListQuery,
} from '../generated/graphql';

type DialogOptions = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  button?: {
    label: React.ReactNode;
    onClick: () => void;
  };
};

function AdminPage() {
  const router = useRouter();

  const [snackbar, setSnackbar] = useState<[Color, string]>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogOptions>();

  const [userIdEditing, setUserIdEditing] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUsername, setNewUsername] = useState<string>();
  const [newDisplayName, setNewDisplayName] = useState<string>();
  const [newIsAdmin, setNewIsAdmin] = useState(false);

  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, error, loading: usersLoading, refetch: refetchUsers } = useUserListQuery();
  const [createUser, { loading: creating }] = useCreateUserMutation({
    onCompleted: () => {
      setNewUsername(undefined);
      setNewDisplayName(undefined);
      setNewIsAdmin(false);
    },
    onError: () => {
      setSnackbar(['error', 'Nastala neočekávaná chyba']);
    },
    update: () => {
      refetchUsers();
    },
  });
  const [updateUser, { loading: updating }] = useUpdateUserMutation({
    onCompleted: () => {
      setUserIdEditing('');
    },
    onError: () => {
      setSnackbar(['error', 'Nastala neočekávaná chyba']);
    },
  });
  const [deleteUser] = useDeleteUserMutation({
    onError: () => {
      setSnackbar(['error', 'Nastala neočekávaná chyba']);
    },
    update: () => {
      refetchUsers();
    },
  });
  const [resetPassword] = useResetPasswordMutation({
    onCompleted: data => {
      setDialog({
        title: 'Nové heslo',
        content: data.resetPassword,
      });
      setDialogOpen(true);
    },
    onError: () => {
      setSnackbar(['error', 'Nastala neočekávaná chyba']);
    },
  });

  function handleEdit(user: UserFragment) {
    setUserIdEditing(user.id);
    setUsername(user.username);
    setDisplayName(user.displayName);
    setIsAdmin(user.isAdmin);
  }

  function handleCreate() {
    if (!newUsername?.trim() || !newDisplayName?.trim()) {
      return;
    }

    createUser({
      variables: {
        user: {
          username: newUsername.trim(),
          displayName: newDisplayName.trim(),
          isAdmin: newIsAdmin,
        },
      },
    });
  }

  function handleUpdate() {
    if (!username.trim() || !displayName.trim()) {
      return;
    }

    updateUser({
      variables: {
        id: userIdEditing,
        user: {
          username: username.trim(),
          displayName: displayName.trim(),
          isAdmin,
        },
      },
    });
  }

  function handleDelete(user: UserFragment) {
    if (user.id === meData!.me!.id) {
      return;
    }

    setDialog({
      title: user.displayName,
      content: 'Opravdu smazat tohoto uživatele?',
      button: {
        label: 'Smazat',
        onClick: () => {
          setDialogOpen(false);
          deleteUser({ variables: { id: user.id } });
        },
      },
    });
    setDialogOpen(true);
  }

  function handleResetPassword(user: UserFragment) {
    setDialog({
      title: user.displayName,
      content: (
        <>
          Opravdu tomuto uživateli resetovat heslo?
          <br />
          Nové heslo se zobrazí pouze jednorázově na obrazovce.
        </>
      ),
      button: {
        label: 'Resetovat',
        onClick: () => {
          resetPassword({ variables: { id: user.id } });
        },
      },
    });
    setDialogOpen(true);
  }

  if (meLoading || usersLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (!meData?.me?.isAdmin) {
    router.push('/');

    return null;
  }

  if (error) {
    return (
      <Layout>
        <Alert elevation={1} severity="error">
          Nastala neočekávná chyba.
        </Alert>
      </Layout>
    );
  }

  const users = (data && data.users) || [];

  return (
    <>
      <DocumentTitle title="Správa uživatelů" />
      <Layout>
        <section>
          <PageHeading>Správa uživatelů</PageHeading>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="200px">Uživatel</TableCell>
                  <TableCell width="200px">Jméno</TableCell>
                  <TableCell align="center" width="70px">
                    Admin
                  </TableCell>
                  <TableCell width="250px">Poslední aktivita</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => {
                  if (userIdEditing === user.id) {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <TextField
                            disabled={updating}
                            error={!username.trim()}
                            value={username}
                            onChange={e => setUsername(e.currentTarget.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            disabled={updating}
                            error={!displayName.trim()}
                            value={displayName}
                            onChange={e => setDisplayName(e.currentTarget.value)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={isAdmin}
                            color="primary"
                            disabled={user.id === meData!.me!.id}
                            inputProps={{ 'aria-label': 'Admin' }}
                            onChange={() => setIsAdmin(!isAdmin)}
                          />
                        </TableCell>
                        <TableCell>
                          {user.lastActivity && new Date(user.lastActivity).toLocaleString('cs')}
                        </TableCell>
                        <TableCell align="left">
                          {updating ? (
                            <CircularProgress size="1.5rem" />
                          ) : (
                            <>
                              <Button color="primary" onClick={handleUpdate}>
                                Uložit
                              </Button>{' '}
                              <Button onClick={() => setUserIdEditing('')}>Zrušit</Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.displayName}</TableCell>
                      <TableCell align="center">{user.isAdmin && <Check />}</TableCell>
                      <TableCell>
                        {user.lastActivity && new Date(user.lastActivity).toLocaleString('cs')}
                      </TableCell>
                      <TableCell align="left">
                        <Button color="primary" onClick={() => handleEdit(user)}>
                          Upravit
                        </Button>{' '}
                        <Button
                          color="primary"
                          disabled={user.id === meData!.me!.id}
                          onClick={() => handleDelete(user)}
                        >
                          Smazat
                        </Button>{' '}
                        <Button color="primary" onClick={() => handleResetPassword(user)}>
                          Reset hesla
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>
                    <TextField
                      error={newUsername === ''}
                      label="Nový uživatel"
                      value={newUsername || ''}
                      onChange={e => setNewUsername(e.currentTarget.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      error={newDisplayName === ''}
                      label="Jméno"
                      value={newDisplayName || ''}
                      onChange={e => setNewDisplayName(e.currentTarget.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={newIsAdmin}
                      color="primary"
                      inputProps={{ 'aria-label': 'Admin' }}
                      onChange={() => setNewIsAdmin(!newIsAdmin)}
                    />
                  </TableCell>
                  <TableCell />
                  <TableCell align="left">
                    {creating ? (
                      <CircularProgress size="1.5rem" />
                    ) : (
                      <Button
                        color="primary"
                        disabled={
                          !newUsername ||
                          !newUsername.trim() ||
                          !newDisplayName ||
                          !newDisplayName.trim()
                        }
                        onClick={handleCreate}
                      >
                        Přidat
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Layout>
      <Snackbar autoHideDuration={5000} open={!!snackbar} onClose={() => setSnackbar(undefined)}>
        <Alert severity={snackbar?.[0]} onClose={() => setSnackbar(undefined)}>
          {snackbar?.[1]}
        </Alert>
      </Snackbar>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">{dialog?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialog?.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus={!dialog?.button} color="primary" onClick={() => setDialogOpen(false)}>
            {dialog?.button ? 'Zrušit' : 'Zavřít'}
          </Button>
          {dialog?.button && (
            <Button color="primary" autoFocus onClick={dialog.button?.onClick}>
              {dialog.button?.label}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(AdminPage);
