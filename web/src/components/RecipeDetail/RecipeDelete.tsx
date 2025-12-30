'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteRecipeAction } from '@/app/actions/recipe';
import { RecipeDeleteModal } from '@/components/RecipeDeleteModal/RecipeDeleteModal';
import { Spinner } from '@/components/common/Spinner';

import { Button } from '../ui/button';

type Props = {
  id: string;
  title: string;
};

export function RecipeDelete(props: Props) {
  const { id, title } = props;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  function handleDeleteConfirm() {
    startTransition(async () => {
      const result = await deleteRecipeAction(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Recept byl úspěšně smazán');
        router.push('/');
      }
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Smazat"
        onClick={() => setDeleteModalVisible(true)}
      >
        <Trash2 className="size-5" />
      </Button>
      <RecipeDeleteModal
        recipeTitle={title}
        show={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
      {isPending && <Spinner />}
    </>
  );
}
