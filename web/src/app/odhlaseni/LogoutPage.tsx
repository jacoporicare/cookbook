'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/lib/use-auth';

export default function LogoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setToken] = useAuth();

  useEffect(() => {
    setToken(undefined);
    router.push(searchParams.get('u') || '/');
  }, [router, searchParams, setToken]);

  return null;
}
