'use client';

import { Check, Pencil, RotateCcw, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState, useTransition } from 'react';
import { toast } from 'sonner';

import {
  createUserAction,
  deleteUserAction,
  resetPasswordAction,
  updateUserAction,
} from '@/app/actions/user';
import { Layout } from '@/components/Layout';
import { PageHeading } from '@/components/common/PageHeading';
import { Spinner } from '@/components/common/Spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RecipeBaseFragment, UserFragment } from '@/generated/graphql';
import { User } from '@/types/user';

type DialogOptions = {
  title?: ReactNode;
  content?: ReactNode;
  button?: {
    label: ReactNode;
    onClick: () => void;
  };
};

type Props = {
  users: UserFragment[];
  currentUserId: string;
  recipes: RecipeBaseFragment[];
  user: User;
};

export function AdminPage({ users, currentUserId, recipes, user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogOptions>();

  const [userIdEditing, setUserIdEditing] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUsername, setNewUsername] = useState<string>();
  const [newDisplayName, setNewDisplayName] = useState<string>();
  const [newIsAdmin, setNewIsAdmin] = useState(false);

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

    startTransition(async () => {
      const formData = new FormData();
      formData.set('username', newUsername.trim());
      formData.set('displayName', newDisplayName.trim());
      formData.set('isAdmin', String(newIsAdmin));

      const result = await createUserAction({ status: undefined }, formData);

      if (result.status !== 'success') {
        const formErrors = result.error?.[''] ?? [];
        toast.error(formErrors[0] ?? 'Nepodařilo se vytvořit uživatele');
        console.error(result);
      } else {
        setNewUsername(undefined);
        setNewDisplayName(undefined);
        setNewIsAdmin(false);
        router.refresh();
      }
    });
  }

  function handleUpdate() {
    if (!username.trim() || !displayName.trim()) {
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.set('username', username.trim());
      formData.set('displayName', displayName.trim());
      formData.set('isAdmin', String(isAdmin));

      const result = await updateUserAction(
        userIdEditing,
        { status: undefined },
        formData,
      );

      if (result.status !== 'success') {
        const formErrors = result.error?.[''] ?? [];
        toast.error(formErrors[0] ?? 'Nepodařilo se aktualizovat uživatele');
      } else {
        setUserIdEditing('');
        router.refresh();
      }
    });
  }

  function handleDelete(user: UserFragment) {
    if (user.id === currentUserId) {
      return;
    }

    setDialog({
      title: user.displayName,
      content: 'Opravdu smazat tohoto uživatele?',
      button: {
        label: 'Smazat',
        onClick: () => {
          setDialogOpen(false);
          startTransition(async () => {
            const result = await deleteUserAction(user.id);
            if (result.error) {
              toast.error(result.error);
            }
            router.refresh();
          });
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
          startTransition(async () => {
            const result = await resetPasswordAction(user.id);
            if (result.status !== 'success') {
              const formErrors = result.error?.[''] ?? [];
              toast.error(formErrors[0] ?? 'Nepodařilo se resetovat heslo');
              setDialogOpen(false);
            } else if (result.newPassword) {
              setDialog({
                title: 'Nové heslo',
                content: result.newPassword,
              });
            }
          });
        },
      },
    });
    setDialogOpen(true);
  }

  return (
    <>
      <Layout recipes={recipes} user={user}>
        {isPending && <Spinner overlay />}
        <div className="mx-auto max-w-4xl">
          <PageHeading>Správa uživatelů</PageHeading>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Uživatel</TableHead>
                  <TableHead className="w-48">Jméno</TableHead>
                  <TableHead className="w-20 text-center">Admin</TableHead>
                  <TableHead className="w-60">Poslední aktivita</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  if (userIdEditing === user.id) {
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="py-1">
                          <Input
                            disabled={isPending}
                            placeholder="Uživatel"
                            value={username}
                            className={
                              !username.trim() ? 'border-destructive' : ''
                            }
                            onChange={(e) => setUsername(e.currentTarget.value)}
                          />
                        </TableCell>
                        <TableCell className="py-1">
                          <Input
                            disabled={isPending}
                            placeholder="Jméno"
                            value={displayName}
                            className={
                              !displayName.trim() ? 'border-destructive' : ''
                            }
                            onChange={(e) =>
                              setDisplayName(e.currentTarget.value)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={isAdmin}
                            disabled={user.id === currentUserId}
                            aria-label="Admin"
                            onCheckedChange={setIsAdmin}
                          />
                        </TableCell>
                        <TableCell>
                          {user.lastActivity &&
                            new Date(user.lastActivity).toLocaleString('cs')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleUpdate}>
                              Uložit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setUserIdEditing('')}
                            >
                              Zrušit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.displayName}</TableCell>
                      <TableCell className="text-center">
                        {user.isAdmin && <Check className="mx-auto size-5" />}
                      </TableCell>
                      <TableCell>
                        {user.lastActivity &&
                          new Date(user.lastActivity).toLocaleString('cs')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={user.id === currentUserId}
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleResetPassword(user)}
                          >
                            <RotateCcw className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell className="py-1">
                    <Input
                      placeholder="Nový uživatel"
                      value={newUsername || ''}
                      className={newUsername === '' ? 'border-destructive' : ''}
                      onChange={(e) => setNewUsername(e.currentTarget.value)}
                    />
                  </TableCell>
                  <TableCell className="py-1">
                    <Input
                      placeholder="Jméno"
                      value={newDisplayName || ''}
                      className={
                        newDisplayName === '' ? 'border-destructive' : ''
                      }
                      onChange={(e) => setNewDisplayName(e.currentTarget.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={newIsAdmin}
                      aria-label="Admin"
                      onCheckedChange={setNewIsAdmin}
                    />
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <Button
                      size="sm"
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
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </Layout>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog?.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialog?.content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {dialog?.button ? 'Zrušit' : 'Zavřít'}
            </AlertDialogCancel>
            {dialog?.button && (
              <AlertDialogAction onClick={dialog.button.onClick}>
                {dialog.button.label}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
