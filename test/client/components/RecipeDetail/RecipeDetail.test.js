import React from 'react';
import renderer from 'react-test-renderer';
import RecipeDetail from '../../../../src/client/components/RecipeDetail/RecipeDetail';

test('<RecipeDetail /> renders correctly', () => {
  const component = renderer.create(
    <RecipeDetail recipe={{}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
