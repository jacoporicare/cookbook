import type { Metadata } from 'next';

import AdminPage from './AdminPage';

export const metadata: Metadata = {
  title: 'Správa uživatelů',
};

export default function Page() {
  return <AdminPage />;
}
