'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { ImportRecipeState, importRecipeAction } from '@/app/actions/recipe';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  show: boolean;
  onClose: () => void;
};

const initialState: ImportRecipeState = {};

function RecipeImportModal({ show, onClose }: Props) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [state, formAction, isPending] = useActionState(
    importRecipeAction,
    initialState,
  );

  // Handle success - redirect to edit page
  useEffect(() => {
    if (state.success && state.recipeSlug) {
      onClose();
      router.push(`/recept/${state.recipeSlug}/upravit`);
    }
  }, [state.success, state.recipeSlug, onClose, router]);

  const handleClose = () => {
    if (!isPending) {
      setUrl('');
      onClose();
    }
  };

  const error = state.error || state.fieldErrors?.url?.[0];

  return (
    <Dialog open={show} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import receptu z webu</DialogTitle>
          <DialogDescription>
            Vložte odkaz na recept z libovolné webové stránky.
            <br />
            Umělá inteligence se pokusí extrahovat recept a vytvořit z něj nový
            recept.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <div className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="url">Odkaz na recept</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://www.priklad.cz/recept/babovka"
                value={url}
                disabled={isPending}
                autoFocus
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleClose}
            >
              Zrušit
            </Button>
            <Button type="submit" disabled={isPending || !url}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isPending ? 'Importuji...' : 'Vytvořit pomocí AI'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeImportModal;
