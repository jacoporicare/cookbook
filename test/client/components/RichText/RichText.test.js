import React from 'react';
import renderer from 'react-test-renderer';
import RichText from '../../../../src/client/components/RichText/RichText';

test('<RichText /> converts formatted text to HTML', () => {
  const text = `*bold* is *bold*
*) list
*) list2
list2 *new* line
*) *list3*
still list3

text _underlined_ <b>no dang'e'ou"r"s</b>

and some spacing


`;

  const component = renderer.create(
    <RichText text={text} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
