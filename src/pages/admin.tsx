import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { Delete } from '@material-ui/icons';
import { Alert, Color } from '@material-ui/lab';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import DocumentTitle from '../components/common/DocumentTitle';
import PageHeading from '../components/common/PageHeading';
import Spinner from '../components/common/Spinner';
import {
  useMeQuery,
  useUserListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useResetPasswordMutation,
  UserFragment,
  UserInput,
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
  const updatingRefTimer = useRef(-1);

  const [snackbar, setSnackbar] = useState<[Color, string]>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogOptions>();

  const [[usernameId, username], setUsername] = useState(['', '']);
  const [[displayNameId, displayName], setDisplayName] = useState(['', '']);
  const [userIdUpdating, setUserIdUpdating] = useState('');

  const [newUsername, setNewUsername] = useState<string>();
  const [newDisplayName, setNewDisplayName] = useState<string>();
  const [newIsAdmin, setNewIsAdmin] = useState(false);

  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, error, loading: usersLoading, refetch: refetchUsers } = useUserListQuery();
  const [createUser, { loading: creating }] = useCreateUserMutation({
    onCompleted: () => {
      setUserIdUpdating('');
      setNewUsername(undefined);
      setNewDisplayName(undefined);
      setNewIsAdmin(false);
      clearTimeout(updatingRefTimer.current);
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
      setUserIdUpdating('');
      clearTimeout(updatingRefTimer.current);
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

  function setUserIdUpdatingDebounced(id: string) {
    updatingRefTimer.current = window.setTimeout(() => setUserIdUpdating(id), 200);
  }

  function handleUsernameUpdate(user: UserFragment) {
    const value = username.trim();

    if (!value || value === user.username) {
      return;
    }

    setUserIdUpdatingDebounced(user._id);
    updateUser({
      variables: {
        id: user._id,
        user: {
          username: value,
          displayName: user.displayName,
          isAdmin: user.isAdmin,
        },
      },
    });
  }

  function handleDisplayNameUpdate(user: UserFragment) {
    const value = displayName.trim();

    if (!value || value === user.displayName) {
      return;
    }

    setUserIdUpdatingDebounced(user._id);
    updateUser({
      variables: {
        id: user._id,
        user: {
          username: user.username,
          displayName: value,
          isAdmin: user.isAdmin,
        },
      },
    });
  }

  function handleIsAdminUpdate(user: UserFragment) {
    if (user._id === meData!.me!._id) {
      return;
    }

    setUserIdUpdatingDebounced(user._id);
    updateUser({
      variables: {
        id: user._id,
        user: {
          username: user.username,
          displayName: user.displayName,
          isAdmin: !user.isAdmin,
        },
      },
    });
  }

  function handleDelete(user: UserFragment) {
    if (user._id === meData!.me!._id) {
      return;
    }

    setDialog({
      title: user.displayName,
      content: 'Opravdu smazat tohoto uživatele?',
      button: {
        label: 'Smazat',
        onClick: () => {
          setDialogOpen(false);
          deleteUser({ variables: { id: user._id } });
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
          resetPassword({ variables: { id: user._id } });
        },
      },
    });
    setDialogOpen(true);
  }

  function handleCreateNew() {
    const user: UserInput = {
      username: newUsername?.trim() || '',
      displayName: newDisplayName?.trim() || '',
      isAdmin: newIsAdmin,
    };

    if (!user.username || !user.displayName) {
      return;
    }

    createUser({ variables: { user } });
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
                  <TableCell width="70px">Admin</TableCell>
                  <TableCell width="250px">Poslední aktivita</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => {
                  const userUpdating = userIdUpdating === user._id && updating;

                  return (
                    <TableRow key={user._id}>
                      <TableCell>
                        <TextField
                          disabled={userUpdating}
                          error={usernameId === user._id && !username.trim()}
                          value={usernameId === user._id ? username : user.username}
                          onBlur={() => handleUsernameUpdate(user)}
                          onChange={e => setUsername([user._id, e.currentTarget.value])}
                          onFocus={() => setUsername([user._id, user.username])}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          disabled={userUpdating}
                          error={displayNameId === user._id && !displayName.trim()}
                          value={displayNameId === user._id ? displayName : user.displayName}
                          onBlur={() => handleDisplayNameUpdate(user)}
                          onChange={e => setDisplayName([user._id, e.currentTarget.value])}
                          onFocus={() => setDisplayName([user._id, user.displayName])}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {userUpdating ? (
                          <CircularProgress size="1.5rem" />
                        ) : (
                          <Switch
                            checked={user.isAdmin || false}
                            color="primary"
                            disabled={user._id === meData!.me!._id}
                            inputProps={{ 'aria-label': 'Admin' }}
                            onChange={() => handleIsAdminUpdate(user)}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.lastActivity && new Date(user.lastActivity).toLocaleString('cs')}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="Smazat"
                          disabled={user._id === meData!.me!._id}
                          onClick={() => handleDelete(user)}
                        >
                          <Delete />
                        </IconButton>{' '}
                        <Button onClick={() => handleResetPassword(user)}>Reset hesla</Button>
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
                        onClick={handleCreateNew}
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
