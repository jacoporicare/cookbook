import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container">
      <h1 className="page-header">Nenalezeno</h1>
      <div className="alert alert-info">
        Toto není stránka, kterou hledáš.
      </div>
    </div>
  );
};

export default NotFoundPage;
