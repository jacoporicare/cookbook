import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useRef, useState } from 'react';
import { notify } from 'react-notify-toast';

import { UserInput } from '../api/apolloServer';
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
import { colors } from '../styles/colors';
import { User } from '../types';

import { MeQueryData, ME_QUERY } from './Layout';

type Props = RouteComponentProps;

export const userFragment = gql`
  fragment user on User {
    _id
    username
    displayName
    isAdmin
    lastActivity
  }
`;

export const USER_LIST_QUERY = gql`
  query UserList {
    users {
      ...user
    }
  }

  ${userFragment}
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      ...user
    }
  }

  ${userFragment}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      ...user
    }
  }

  ${userFragment}
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id)
  }
`;

export type UserListQueryData = {
  users: User[];
};

export type CreateUserMutationData = {
  createUser?: User;
};

export type CreateUserMutationVariables = {
  user: UserInput;
};

export type UpdateUserMutationData = {
  updateUser?: User;
};

export type UpdateUserMutationVariables = {
  id: string;
  user: UserInput;
};

export type DeleteUserMutationData = {
  deleteUser?: string;
};

export type DeleteUserMutationVariables = {
  id: string;
};

export type ResetPasswordMutationData = {
  resetPassword?: string;
};

export type ResetPasswordMutationVariables = {
  id: string;
};

function AdminPage(_props: Props) {
  const updatingRefTimer = useRef(-1);
  const { data: meData, loading: meLoading } = useQuery<MeQueryData>(ME_QUERY);
  const { data, error, loading: usersLoading } = useQuery<UserListQueryData>(USER_LIST_QUERY);
  const [createUser, { loading: creating }] = useMutation<
    CreateUserMutationData,
    CreateUserMutationVariables
  >(CREATE_USER_MUTATION, {
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
    update: (store, result) => {
      if (!result.data || !result.data.createUser) {
        return;
      }

      const data = store.readQuery<UserListQueryData>({ query: USER_LIST_QUERY });

      if (!data) {
        return;
      }

      data.users.push(result.data.createUser);

      store.writeQuery({ query: USER_LIST_QUERY, data });
    },
  });
  const [updateUser, { loading: updating }] = useMutation<
    UpdateUserMutationData,
    UpdateUserMutationVariables
  >(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      setUserIdUpdating('');
      clearTimeout(updatingRefTimer.current);
    },
    onError: () => {
      notify.show('Nastala neočekávaná chyba', 'error');
    },
  });
  const [deleteUser] = useMutation<DeleteUserMutationData, DeleteUserMutationVariables>(
    DELETE_USER_MUTATION,
    {
      onError: () => {
        notify.show('Nastala neočekávaná chyba', 'error');
      },
      update: (store, result) => {
        if (!result.data) {
          return;
        }

        const data = store.readQuery<UserListQueryData>({ query: USER_LIST_QUERY });

        if (!data) {
          return;
        }

        data.users = data.users.filter(r => r._id !== result.data!.deleteUser);

        store.writeQuery({ query: USER_LIST_QUERY, data });
      },
    },
  );
  const [resetPassword] = useMutation<ResetPasswordMutationData, ResetPasswordMutationVariables>(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: data => {
        window.alert(`Nové heslo: ${data.resetPassword}`);
      },
      onError: () => {
        notify.show('Nastala neočekávaná chyba', 'error');
      },
    },
  );

  const [[usernameId, username], setUsername] = useState(['', '']);
  const [[displayNameId, displayName], setDisplayName] = useState(['', '']);
  const [userIdUpdating, setUserIdUpdating] = useState('');

  const [newUsername, setNewUsername] = useState<string>();
  const [newDisplayName, setNewDisplayName] = useState<string>();
  const [newIsAdmin, setNewIsAdmin] = useState(false);

  function setUserIdUpdatingDebounced(id: string) {
    updatingRefTimer.current = window.setTimeout(() => setUserIdUpdating(id), 200);
  }

  function handleUsernameUpdate(user: User) {
    const value = username.trim();

    if (!value || value === user.username) {
      return;
    }

    setUserIdUpdatingDebounced(user._id);
    updateUser({
      variables: {
        id: user._id,
        user: {
          username,
          displayName: user.displayName,
          isAdmin: user.isAdmin,
        },
      },
    });
  }

  function handleDisplayNameUpdate(user: User) {
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
          displayName,
          isAdmin: user.isAdmin,
        },
      },
    });
  }

  function handleIsAdminUpdate(user: User) {
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

  function handleDelete(user: User) {
    if (user._id === meData!.me!._id) {
      return;
    }

    if (!window.confirm(`Opravdu smazat uživatele ${user.displayName}?`)) {
      return;
    }

    deleteUser({ variables: { id: user._id } });
  }

  function handleResetPassword(user: User) {
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
      username: newUsername ? newUsername.trim() : '',
      displayName: newDisplayName ? newDisplayName.trim() : '',
      isAdmin: newIsAdmin,
    };

    if (!user.username || !user.displayName) {
      return;
    }

    createUser({ variables: { user } });
  }

  if (meLoading || usersLoading) {
    return <Spinner />;
  }

  if (!meData || !meData.me || !meData.me.isAdmin) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <DangerAlert>Nastala neočekávná chyba.</DangerAlert>;
  }

  const users = (data && data.users) || [];

  return (
    <BoxSection>
      <PageHeading>Správa uživatelů</PageHeading>
      <Table>
        <thead>
          <TableHeadRow>
            <TableHeadCell width="200px">Uživatel</TableHeadCell>
            <TableHeadCell width="200px">Jméno</TableHeadCell>
            <TableHeadCell width="70px">Admin</TableHeadCell>
            <TableHeadCell>Poslední aktivita</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHeadRow>
        </thead>
        <tbody>
          {users.map(user => {
            const userUpdating = userIdUpdating === user._id && updating;

            return (
              <TableRow key={user._id}>
                <TableCell>
                  <Input
                    type="text"
                    value={usernameId === user._id ? username : user.username}
                    onFocus={() => setUsername([user._id, user.username])}
                    onChange={e => setUsername([user._id, e.currentTarget.value])}
                    onBlur={() => handleUsernameUpdate(user)}
                    hasError={usernameId === user._id && !username.trim()}
                    readOnly={userUpdating}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={displayNameId === user._id ? displayName : user.displayName}
                    onFocus={() => setDisplayName([user._id, user.displayName])}
                    onChange={e => setDisplayName([user._id, e.currentTarget.value])}
                    onBlur={() => handleDisplayNameUpdate(user)}
                    hasError={displayNameId === user._id && !displayName.trim()}
                    readOnly={userUpdating}
                  />
                </TableCell>
                <TableCell textAlign="center">
                  {userUpdating ? (
                    <Icon icon="spinner" spin lg />
                  ) : (
                    <Icon
                      icon={user.isAdmin ? 'toggle-on' : 'toggle-off'}
                      lg
                      css={{
                        cursor: user._id !== meData!.me!._id ? 'pointer' : undefined,
                        opacity: user._id !== meData!.me!._id ? 1 : 0.5,
                        color: user.isAdmin ? colors.blue : colors.gray600,
                      }}
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
                    <Icon icon="trash" css={{ marginLeft: '0.5em' }} />
                  </DangerButton>{' '}
                  <Button onClick={() => handleResetPassword(user)}>Reset hesla</Button>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>
              <Input
                type="text"
                value={newUsername || ''}
                onChange={e => setNewUsername(e.currentTarget.value)}
                hasError={newUsername === ''}
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                value={newDisplayName || ''}
                onChange={e => setNewDisplayName(e.currentTarget.value)}
                hasError={newDisplayName === ''}
              />
            </TableCell>
            <TableCell textAlign="center">
              <Icon
                icon={newIsAdmin ? 'toggle-on' : 'toggle-off'}
                lg
                css={{
                  cursor: 'pointer',
                  color: newIsAdmin ? colors.blue : colors.gray600,
                }}
                onClick={() => setNewIsAdmin(!newIsAdmin)}
              />
            </TableCell>
            <TableCell />
            <TableCell textAlign="center">
              {creating ? (
                <Icon icon="spinner" spin lg />
              ) : (
                <SuccessButton onClick={handleCreateNew}>Přidat</SuccessButton>
              )}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </BoxSection>
  );
}

export default AdminPage;
