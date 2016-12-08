import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RecipeDeleteModal = ({ show, recipeTitle, onClose, onConfirm }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Smazat recept</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Určitě smazat recept <strong>{recipeTitle}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={onConfirm}>Smazat</Button>
      <Button onClick={onClose}>Zrušit</Button>
    </Modal.Footer>
  </Modal>
);

RecipeDeleteModal.propTypes = {
  show: PropTypes.bool,
  recipeTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default RecipeDeleteModal;
