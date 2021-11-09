import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

function RecipeDeleteModal({ show, recipeTitle, onClose, onConfirm }: Props) {
  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={show}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title">{recipeTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Chcete smazat tento recept?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Zrušit
        </Button>
        <Button color="primary" autoFocus onClick={onConfirm}>
          Smazat
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecipeDeleteModal;
