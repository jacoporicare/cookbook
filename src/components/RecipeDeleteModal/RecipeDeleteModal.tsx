import React from 'react';
import Modal from 'react-modal';
import { css, ClassNames } from '@emotion/core';

import { colors } from '../../styles/colors';
import { Box } from '../core';
import { DangerButton, Button } from '../elements';

type Props = {
  show: boolean;
  recipeTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

function RecipeDeleteModal({ show, recipeTitle, onClose, onConfirm }: Props) {
  return (
    <ClassNames>
      {({ css: classNames }) => (
        <Modal
          isOpen={show}
          onRequestClose={onClose}
          overlayClassName={classNames({
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            overflowX: 'hidden',
            overflowY: 'auto',
          })}
          className={classNames({
            position: 'relative',
            width: 'auto',
            margin: '0.5rem',
            pointerEvents: 'none',

            '@media (min-width: 576px)': {
              maxWidth: '500px',
              margin: '1.75rem auto',
            },
          })}
          bodyOpenClassName={classNames({ overflow: 'hidden' })}
          ariaHideApp={false}
        >
          <div
            css={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              pointerEvents: 'auto',
              backgroundColor: colors.white,
              backgroundClip: 'padding-box',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '0.3rem',
              outline: 0,
            }}
          >
            <div
              css={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '1rem',
                borderBottom: `1px solid ${colors.gray200}`,
                borderTopLeftRadius: '0.3rem',
                borderTopRightRadius: '0.3rem',
              }}
            >
              <h5 css={{ fontSize: '1.25rem', marginBottom: '0', lineHeight: '1.5' }}>
                Smazat recept
              </h5>
              <button
                type="button"
                onClick={onClose}
                css={{
                  cursor: 'pointer',
                  padding: '1rem',
                  margin: '-1rem -1rem -1rem auto',
                  backgroundColor: 'transparent',
                  border: 0,
                  WebkitAppearance: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#000',
                  textShadow: '0 1px 0 #fff',
                  opacity: 0.5,

                  '&:hover': {
                    color: '#000',
                    textDecoration: 'none',
                    opacity: 0.75,
                  },
                }}
              >
                ×
              </button>
            </div>
            <div css={{ position: 'relative', flex: '1 1 auto', padding: '1rem' }}>
              Určitě smazat recept <strong>{recipeTitle}</strong>?
            </div>
            <div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '1rem',
                borderTop: `1px solid ${colors.gray200}`,
              }}
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
      )}
    </ClassNames>
  );
}

export default RecipeDeleteModal;
