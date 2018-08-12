import React from 'react';

import { SideDish } from '../../types';

type Props = SideDish;

export default function SideDishListItem({ title, sideWeight, mainWeight }: Props) {
  return (
    <tr>
      <td>{title}</td>
      <td className="text-right">{sideWeight}</td>
      <td className="text-right">{mainWeight}</td>
    </tr>
  );
}
