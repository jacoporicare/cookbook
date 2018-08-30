import React from 'react';
import Modal from 'react-modal';
import { css } from 'emotion';

import { colors } from '../../styles/colors';
import { Box } from '../core';
import { DangerButton, Button } from '../elements/Button';

type Props = {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const RecipeDeleteModal = ({ show, recipeTitle, onClose, onConfirm }: Props) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName={css`
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1050;
        overflow-x: hidden;
        overflow-y: auto;
      `}
      className={css`
        position: relative;
        width: auto;
        margin: 0.5rem;
        pointer-events: none;

        @media (min-width: 576px) {
          max-width: 500px;
          margin: 1.75rem auto;
        }
      `}
      bodyOpenClassName={css`
        overflow: hidden;
      `}
      ariaHideApp={false}
    >
      <div
        css={`
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          pointer-events: auto;
          background-color: ${colors.white};
          background-clip: padding-box;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 0.3rem;
          outline: 0;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid ${colors.gray200};
            border-top-left-radius: 0.3rem;
            border-top-right-radius: 0.3rem;
          `}
        >
          <h5
            css={`
              font-size: 1.25rem;
              margin-bottom: 0;
              line-height: 1.5;
            `}
          >
            Smazat recept
          </h5>
          <button
            type="button"
            onClick={onClose}
            css={`
              cursor: pointer;
              padding: 1rem;
              margin: -1rem -1rem -1rem auto;
              background-color: transparent;
              border: 0;
              -webkit-appearance: none !important;
              font-size: 1.5rem;
              font-weight: 700;
              line-height: 1;
              color: #000;
              text-shadow: 0 1px 0 #fff;
              opacity: 0.5;

              &:hover {
                color: #000;
                text-decoration: none;
                opacity: 0.75;
              }
            `}
          >
            ×
          </button>
        </div>
        <div
          css={`
            position: relative;
            flex: 1 1 auto;
            padding: 1rem;
          `}
        >
          Určitě smazat recept <strong>{recipeTitle}</strong>?
        </div>
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 1rem;
            border-top: 1px solid ${colors.gray200};
          `}
        >
          <Box mr={2}>
            <DangerButton type="button" onClick={onConfirm}>
              Smazat
            </DangerButton>
          </Box>
          <Button type="button" onClick={onClose}>
            Zrušit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
