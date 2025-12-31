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

type Props = {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function RecipeDeleteModal({
  show,
  recipeTitle,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={show} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{recipeTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            Chcete smazat tento recept?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Smazat</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
