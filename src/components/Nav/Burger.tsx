import React from 'react';

function Burger() {
  return (
    <>
      <input id="openSidebarMenu" type="checkbox" />
      <label htmlFor="openSidebarMenu">
        <div className="part-1" />
        <div className="part-2" />
        <div className="part-3" />
      </label>
      <style jsx>{`
        input:checked ~ :global(nav) {
          transform: translateX(0);
        }

        input {
          transition: all 0.3s;
          box-sizing: border-box;
          display: none;
        }

        label {
          flex-shrink: 0;
          display: block;
          cursor: pointer;
          height: 22px;
          width: 22px;
          margin-top: 17px;
          margin-left: 8px;
          transition: all 0.3s;
        }

        label > div {
          height: 3px;
          width: 100%;
          background-color: #fff;
          transition: all 0.3s;
        }

        .part-2 {
          margin-top: 3px;
        }

        .part-3 {
          margin-top: 3px;
        }

        input:checked ~ label > .part-2 {
          opacity: 0;
        }

        input:checked ~ label > .part-1 {
          transform: rotate(135deg);
          margin-top: 7px;
        }

        input:checked ~ label > .part-3 {
          transform: rotate(-135deg);
          margin-top: -9px;
        }

        @media (min-width: 1024px) {
          label {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Burger;
