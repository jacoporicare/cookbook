import React from 'react';
import renderer from 'react-test-renderer';
import RecipeDetail from '../../../../src/client/components/RecipeDetail/RecipeDetail';

describe('<RecipeDetail />', () => {
  test('renders alerts', () => {
    const component = renderer.create(
      <RecipeDetail recipe={{}} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
