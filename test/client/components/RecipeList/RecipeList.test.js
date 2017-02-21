import React from 'react';
import renderer from 'react-test-renderer';
import RecipeList from '../../../../src/client/components/RecipeList/RecipeList';

describe('<RecipeList />', () => {
  test('renders recipes', () => {
    const recipes = [
      {
        _id: 1,
        slug: 'recept-1',
        title: 'Recept 1',
      },
      {
        _id: 2,
        slug: 'recept-2',
        title: 'Recept 2',
        preparationTime: 120,
      },
      {
        _id: 3,
        slug: 'recept-3',
        title: 'Recept 3',
        sideDish: 'kaše',
      },
      {
        _id: 4,
        slug: 'recept-4',
        title: 'Recept 4',
        preparationTime: 120,
        sideDish: 'kaše',
      },
    ];

    const component = renderer.create(
      <RecipeList recipes={recipes} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
