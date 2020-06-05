import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { notify } from 'react-notify-toast';

import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import DocumentTitle from '../components/common/DocumentTitle';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import Spinner from '../components/common/Spinner';
import { BoxSection } from '../components/core';
import {
  Button,
  DangerAlert,
  DangerButton,
  Input,
  SuccessButton,
  Table,
  TableCell,
  TableHeadCell,
  TableHeadRow,
  TableRow,
} from '../components/elements';
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
import { colors } from '../styles/colors';

function AdminPage() {
  const router = useRouter();
  const updatingRefTimer = useRef(-1);

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
      notify.show('Nastala neočekávaná chyba', 'error');
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
      notify.show('Nastala neočekávaná chyba', 'error');
    },
  });
  const [deleteUser] = useDeleteUserMutation({
    onError: () => {
      notify.show('Nastala neočekávaná chyba', 'error');
    },
    update: () => {
      refetchUsers();
    },
  });
  const [resetPassword] = useResetPasswordMutation({
    onCompleted: data => {
      window.alert(`Nové heslo: ${data.resetPassword}`);
    },
    onError: () => {
      notify.show('Nastala neočekávaná chyba', 'error');
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

    if (!window.confirm(`Opravdu smazat uživatele ${user.displayName}?`)) {
      return;
    }

    deleteUser({ variables: { id: user._id } });
  }

  function handleResetPassword(user: UserFragment) {
    if (
      !window.confirm(
        `Opravdu resetovat heslo uživatele ${user.displayName}?
Nové heslo se zobrazí pouze jednorázově na obrazovce.`,
      )
    ) {
      return;
    }

    resetPassword({ variables: { id: user._id } });
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
        <DangerAlert>Nastala neočekávná chyba.</DangerAlert>
      </Layout>
    );
  }

  const users = (data && data.users) || [];

  return (
    <Layout>
      <DocumentTitle title="Správa uživatelů" />
      <BoxSection>
        <PageHeading>Správa uživatelů</PageHeading>
        <Table>
          <thead>
            <TableHeadRow>
              <TableHeadCell width="200px">Uživatel</TableHeadCell>
              <TableHeadCell width="200px">Jméno</TableHeadCell>
              <TableHeadCell width="70px">Admin</TableHeadCell>
              <TableHeadCell>Poslední aktivita</TableHeadCell>
              <TableHeadCell />
            </TableHeadRow>
          </thead>
          <tbody>
            {users.map(user => {
              const userUpdating = userIdUpdating === user._id && updating;

              return (
                <TableRow key={user._id}>
                  <TableCell>
                    <Input
                      hasError={usernameId === user._id && !username.trim()}
                      readOnly={userUpdating}
                      type="text"
                      value={usernameId === user._id ? username : user.username}
                      onBlur={() => handleUsernameUpdate(user)}
                      onChange={e => setUsername([user._id, e.currentTarget.value])}
                      onFocus={() => setUsername([user._id, user.username])}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      hasError={displayNameId === user._id && !displayName.trim()}
                      readOnly={userUpdating}
                      type="text"
                      value={displayNameId === user._id ? displayName : user.displayName}
                      onBlur={() => handleDisplayNameUpdate(user)}
                      onChange={e => setDisplayName([user._id, e.currentTarget.value])}
                      onFocus={() => setDisplayName([user._id, user.displayName])}
                    />
                  </TableCell>
                  <TableCell textAlign="center">
                    {userUpdating ? (
                      <Icon icon="spinner" lg spin />
                    ) : (
                      <Icon
                        css={{
                          cursor: user._id !== meData.me!._id ? 'pointer' : undefined,
                          opacity: user._id !== meData.me!._id ? 1 : 0.5,
                          color: user.isAdmin ? colors.blue : colors.gray600,
                        }}
                        icon={user.isAdmin ? 'toggle-on' : 'toggle-off'}
                        lg
                        onClick={() => handleIsAdminUpdate(user)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {user.lastActivity && new Date(user.lastActivity).toLocaleString('cs')}
                  </TableCell>
                  <TableCell textAlign="center">
                    <DangerButton
                      disabled={user._id === meData!.me!._id}
                      onClick={() => handleDelete(user)}
                    >
                      <Icon css={{ marginLeft: '0.5em' }} icon="trash" />
                    </DangerButton>{' '}
                    <Button onClick={() => handleResetPassword(user)}>Reset hesla</Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <Input
                  hasError={newUsername === ''}
                  type="text"
                  value={newUsername || ''}
                  onChange={e => setNewUsername(e.currentTarget.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  hasError={newDisplayName === ''}
                  type="text"
                  value={newDisplayName || ''}
                  onChange={e => setNewDisplayName(e.currentTarget.value)}
                />
              </TableCell>
              <TableCell textAlign="center">
                <Icon
                  css={{
                    cursor: 'pointer',
                    color: newIsAdmin ? colors.blue : colors.gray600,
                  }}
                  icon={newIsAdmin ? 'toggle-on' : 'toggle-off'}
                  lg
                  onClick={() => setNewIsAdmin(!newIsAdmin)}
                />
              </TableCell>
              <TableCell />
              <TableCell textAlign="center">
                {creating ? (
                  <Icon icon="spinner" lg spin />
                ) : (
                  <SuccessButton
                    disabled={
                      !newUsername ||
                      !newUsername.trim() ||
                      !newDisplayName ||
                      !newDisplayName.trim()
                    }
                    onClick={handleCreateNew}
                  >
                    Přidat
                  </SuccessButton>
                )}
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </BoxSection>
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(AdminPage);
