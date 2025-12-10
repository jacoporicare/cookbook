import type { Metadata } from 'next';

import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
