import React from 'react';

import { Text } from '../core';

export default function Footer() {
  return <Text fontSize="0.75em">© {new Date().getFullYear()} · Žrádelník</Text>;
}
