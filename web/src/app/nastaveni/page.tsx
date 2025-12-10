import type { Metadata } from 'next';

import SettingsPage from './SettingsPage';

export const metadata: Metadata = {
  title: 'Nastavení',
};

export default function Page() {
  return <SettingsPage />;
}
