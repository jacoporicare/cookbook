import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="container">
      <hr />
      <p>&copy; {year} &middot; Žrádelník</p>
    </div>
  );
};

export default Footer;
