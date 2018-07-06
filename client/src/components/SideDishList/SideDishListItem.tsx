import React from 'react';

import { SideDish } from '../../types';

type Props = SideDish;

const SideDishListItem = ({ title, sideWeight, mainWeight }: Props) => (
  <tr>
    <td>{title}</td>
    <td className="text-right">{sideWeight}</td>
    <td className="text-right">{mainWeight}</td>
  </tr>
);

export default SideDishListItem;
