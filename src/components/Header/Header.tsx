import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { colors } from '../../styles/colors';
import Nav from '../Nav';
import RecipeSearch from '../RecipeSearch';
import { Box, BoxHeader } from '../core';

const WakeLock = dynamic(() => import('../WakeLock'), { ssr: false });

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
        <Box display="flex" justifyContent="space-between" px={[3, 4]} py={1}>
          <Box alignItems="center" display="flex">
            <Link href="/">
              <a className="logo">
                <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
                <Box display={['none', 'inline']} ml={3}>
                  Žrádelník
                </Box>
              </a>
            </Link>
          </Box>
          <Box alignItems="center" display="flex">
            {props.showRecipeSearch && <RecipeSearch />}
            <WakeLock />
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
      `}</style>
    </>
  );
}

export default Header;
