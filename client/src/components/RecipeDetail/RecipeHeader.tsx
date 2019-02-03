import React from 'react';
import { Link } from '@reach/router';

import { Box } from '../core';
import { Button, DangerButton } from '../elements';
import PageHeading from '../common/PageHeading';
import Icon from '../common/Icon';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  title: string;
  isAuthenticated: boolean;
  isAuthor?: boolean;
  onDeleteShow: () => void;
};

const EditRecipeButton = Button.withComponent(Link);

function RecipeHeader({
  preparationTime,
  sideDish,
  slug,
  title,
  isAuthenticated,
  isAuthor,
  onDeleteShow,
}: Props) {
  return (
    <>
      <PageHeading
        buttons={
          navigator.onLine &&
          isAuthenticated &&
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
