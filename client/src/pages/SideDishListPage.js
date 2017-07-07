import React from 'react';

const SideDishListPage = () =>
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
        <tr>
          <td>Brambory</td>
          <td className="text-right">300 g</td>
          <td className="text-right" />
        </tr>
        <tr>
          <td>Těstoviny</td>
          <td className="text-right">70 g</td>
          <td className="text-right">100 g</td>
        </tr>
        <tr>
          <td>Rýže</td>
          <td className="text-right">70 g</td>
          <td className="text-right">100 g</td>
        </tr>
        <tr>
          <td>Čočka</td>
          <td className="text-right">70 g</td>
          <td className="text-right">100 g</td>
        </tr>
        <tr>
          <td>Kuskus</td>
          <td className="text-right">45 g</td>
          <td className="text-right">70 g</td>
        </tr>
        <tr>
          <td>Polenta</td>
          <td className="text-right">45 g</td>
          <td className="text-right" />
        </tr>
      </tbody>

    </table>

  </div>;

export default SideDishListPage;
