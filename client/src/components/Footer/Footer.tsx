import React from 'react';

export default function Footer() {
  return (
    <div className="container">
      <hr />
      <p>© {new Date().getFullYear()} · Žrádelník</p>
    </div>
  );
}
