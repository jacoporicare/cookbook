import React from 'react';

import { SideDish } from '../../types';
import SideDishListItem from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

export default function SideDishList({ sideDishes }: Props) {
  return (
    <div className="container">
      <h1 className="page-header">Přílohy</h1>

      <table className="table table-hover" style={{ width: 'auto' }}>
        <thead>
          <tr>
            <th>Název</th>
            <th>Příloha</th>
            <th>Hlavní</th>
          </tr>
        </thead>

        <tbody>
          {sideDishes.map(sideDish => (
            <SideDishListItem key={sideDish.title} {...sideDish} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
