import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useImportRecipeMutation } from '../../generated/graphql';

type Props = {
  show: boolean;
  onClose: () => void;
};

function RecipeImportModal({ show, onClose }: Props) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [importRecipe, { loading }] = useImportRecipeMutation({
    onCompleted: data => {
      onClose();
      router.push(`/recept/${data.importRecipe.slug}/upravit`);
    },
    onError: err => {
      setError(err.message || 'Nastala neočekávaná chyba při importu receptu.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Zadejte prosím platný odkaz.');

      return;
    }

    importRecipe({ variables: { url: url.trim() } });
  };

  const handleClose = () => {
    if (!loading) {
      setUrl('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      aria-describedby="import-dialog-description"
      aria-labelledby="import-dialog-title"
      open={show}
      onClose={handleClose}
    >
      <DialogTitle id="import-dialog-title">Import receptu z webu</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText id="import-dialog-description" sx={{ mb: 4 }}>
            Vložte odkaz na recept z libovolné webové stránky.
            <br />
            Umělá inteligence se pokusí extrahovat recept a vytvořit z něj nový recept.
          </DialogContentText>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            disabled={loading}
            label="Odkaz na recept"
            placeholder="https://www.priklad.cz/recept/babovka"
            type="url"
            value={url}
            variant="outlined"
            autoFocus
            fullWidth
            required
            onChange={e => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={loading} onClick={handleClose}>
            Zrušit
          </Button>
          <Button
            color="primary"
            disabled={loading || !url}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            type="submit"
            variant="contained"
          >
            {loading ? 'Importuji...' : 'Vytvořit pomocí AI'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RecipeImportModal;
