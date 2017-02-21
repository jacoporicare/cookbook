import React from 'react';
import renderer from 'react-test-renderer';
import Ingredients from '../../../../src/client/components/RecipeDetail/Ingredients';

describe('<Ingredients /> (RecipeDetail)', () => {
  test('renders list of ingredients and a group', () => {
    const ingredients = [
      {
        _id: 1,
        isGroup: true,
        name: 'Skupina 1',
      },
      {
        _id: 2,
        name: 'sůl',
      },
      {
        _id: 3,
        name: 'maso',
        amount: 1,
        amountUnit: 'kg',
      },
      {
        _id: 4,
        name: 'pepř',
        amountUnit: 'hrst',
      },
    ];

    const component = renderer.create(
      <Ingredients ingredients={ingredients} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
