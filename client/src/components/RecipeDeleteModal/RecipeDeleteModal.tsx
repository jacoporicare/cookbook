import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const RecipeDeleteModal = ({ show, recipeTitle, onClose, onConfirm }: Props) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Smazat recept</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Určitě smazat recept <strong>{recipeTitle}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={onConfirm}>
        Smazat
      </Button>
      <Button onClick={onClose}>Zrušit</Button>
    </Modal.Footer>
  </Modal>
);

export default RecipeDeleteModal;
