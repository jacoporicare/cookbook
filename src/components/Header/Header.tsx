import Link from 'next/link';
import React from 'react';

import { colors } from '../../styles/colors';
import Nav from '../Nav';
import RecipeSearch from '../RecipeSearch';
import { Box, BoxHeader } from '../core';

import cow from './cow.png';
import pig from './pig.png';

type Props = {
  showRecipeSearch?: boolean;
  showUserInfo?: boolean;
};

function Header(props: Props) {
  return (
    <>
      <BoxHeader
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          color: 'white',
          backgroundColor: colors.gray1000,
          boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          overflow={['auto', 'initial']}
          px={[3, 4]}
          py={1}
        >
          <Box alignItems="center" display="flex">
            <Link href="/">
              <a className="logo">
                <img alt="Prase" className="icon" src={pig} />{' '}
                <Box display={['none', 'inline']}>Žrádelník</Box>{' '}
                <img alt="Kráva" className="icon" src={cow} />
              </a>
            </Link>
          </Box>
          <Box display="flex">
            {props.showRecipeSearch && <RecipeSearch />}
            <Nav showUserInfo={props.showUserInfo} />
          </Box>
        </Box>
      </BoxHeader>
      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          font-family: 'Amatic SC', cursive;
          font-size: 36px;
          color: white;
        }

        .logo:hover {
          color: white;
          text-decoration: none;
        }

        .icon {
          width: 40px;
          height: 40px;
          margin: 0 4px;
        }
      `}</style>
    </>
  );
}

export default Header;
