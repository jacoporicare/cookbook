'use client';

import { useSyncExternalStore } from 'react';

type Props = {
  date: string | Date;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export function ClientDate({ date, locale = 'cs', options }: Props) {
  const formatted = useSyncExternalStore(
    () => () => {},
    () => new Date(date).toLocaleString(locale, options),
    () => undefined,
  );

  return formatted ?? null;
}
