import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FormEventHandler } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient } from '../../generated/graphql';
import { AutosuggestChangeEventHandler } from '../../types';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import RichText from '../RichText/RichText';
import Spinner from '../common/Spinner';
import { Box } from '../core';

import BasicInfo from './BasicInfo';
import Directions from './Directions';
import Header from './Header';
import IngredientEdit, {
  AddGroupEventHandler,
  AddIngredientEventHandler,
  RemoveEventHandler,
} from './IngredientEdit';
import Title from './Title';

type Props = {
  changed: boolean;
  directions?: string;
  imageUrl?: string;
  ingredientOptions: string[];
  ingredients: Omit<Ingredient, '_id'>[];
  isNew: boolean;
  isSaving: boolean;
  onAddGroup: AddGroupEventHandler;
  onAddIngredient: AddIngredientEventHandler;
  onChange: AutosuggestChangeEventHandler;
  onImageChange: (data: File) => void;
  onRemoveIngredient: RemoveEventHandler;
  onSortIngredient: SortEndHandler;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onTagsChange: (tags: string[]) => void;
  preparationTime: number | null;
  servingCount: number | null;
  sideDish: string | null;
  sideDishOptions: string[];
  tags: string[] | null;
  tagOptions: string[];
  title?: string;
};

function RecipeEdit({
  changed,
  directions,
  imageUrl,
  ingredientOptions,
  ingredients,
  isNew,
  isSaving,
  onAddGroup,
  onAddIngredient,
  onChange,
  onImageChange,
  onRemoveIngredient,
  onSortIngredient,
  onSubmit,
  onTagsChange,
  preparationTime,
  servingCount,
  sideDish,
  sideDishOptions,
  tags,
  tagOptions,
  title,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      {isSaving && <Spinner overlay />}

      <Header changed={changed} isNew={isNew} isSaving={isSaving} title={title} />

      <Title title={title} onChange={onChange} />

      <Box mt={4}>
        <Grid spacing={4} container>
          <Grid md={2} xs={12} item>
            <Typography component="h3" variant="h5" gutterBottom>
              Základní údaje
            </Typography>
            <Paper>
              <Box p={3}>
                <BasicInfo
                  preparationTime={preparationTime}
                  servingCount={servingCount}
                  sideDish={sideDish}
                  sideDishOptions={sideDishOptions}
                  tagOptions={tagOptions}
                  tags={tags}
                  onChange={onChange}
                  onTagsChange={onTagsChange}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid md={4} xs={12} item>
            <Typography component="h3" variant="h5" gutterBottom>
              Ingredience
            </Typography>
            <Paper>
              <Box p={3}>
                <IngredientEdit
                  ingredientOptions={ingredientOptions}
                  items={ingredients}
                  onAdd={onAddIngredient}
                  onAddGroup={onAddGroup}
                  onRemove={onRemoveIngredient}
                  onSort={onSortIngredient}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid md={6} xs={12} item>
            <Typography component="h3" variant="h5" gutterBottom>
              Postup
            </Typography>
            <Paper>
              <Box p={3}>
                <Directions directions={directions} onChange={onChange} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography component="h3" variant="h5" gutterBottom>
          Náhled postupu
        </Typography>
        <ImageUpload imageUrl={imageUrl} onImageChange={onImageChange} />
        <RichText text={directions} />
      </Box>
    </form>
  );
}

export default RecipeEdit;
