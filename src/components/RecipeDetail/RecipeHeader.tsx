import { Link } from '@reach/router';
import React from 'react';

import { isAuthenticated } from '../../clientAuth';
import { isOnline } from '../../utils';
import Icon from '../common/Icon';
import PageHeading from '../common/PageHeading';
import { Box } from '../core';
import { Button, DangerButton } from '../elements';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  title: string;
  isAuthor?: boolean;
  onDeleteShow: () => void;
};

const EditRecipeButton = Button.withComponent(Link);

function RecipeHeader({ preparationTime, sideDish, slug, title, isAuthor, onDeleteShow }: Props) {
  return (
    <>
      <PageHeading
        buttons={
          isOnline() &&
          isAuthenticated() &&
          isAuthor && (
            <>
              <EditRecipeButton to={`/recept/${slug}/upravit`}>
                <Icon icon="edit" regular />
                Upravit
              </EditRecipeButton>
              <DangerButton onClick={onDeleteShow}>
                <Icon icon="trash-alt" regular />
                Smazat
              </DangerButton>
            </>
          )
        }
      >
        {title}
      </PageHeading>

      {(preparationTime || sideDish) && (
        <Box mb={3}>
          <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
        </Box>
      )}
    </>
  );
}

export default RecipeHeader;
