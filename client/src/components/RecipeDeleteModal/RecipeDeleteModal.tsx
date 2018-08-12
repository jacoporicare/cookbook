import React from 'react';
import Modal from 'react-modal';

type Props = {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function RecipeDeleteModal({ show, recipeTitle, onClose, onConfirm }: Props) {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName="modal"
      className="modal-dialog"
      // bodyOpenClassName="modal-open"
      ariaHideApp={false}
      style={{
        overlay: {
          display: 'block',
          backgroundColor: 'rgba(0,0,0, 0.3)',
        },
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
          <h4 className="modal-title">Smazat recept</h4>
        </div>
        <div className="modal-body">
          Určitě smazat recept <strong>{recipeTitle}</strong>?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Smazat
          </button>
          <button type="button" className="btn btn-default" onClick={onClose}>
            Zrušit
          </button>
        </div>
      </div>
    </Modal>
  );
}
