'use client';

import { useEffect, useState } from 'react';

type Props = {
  date: string | Date;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export function ClientDate({ date, locale = 'cs', options }: Props) {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(new Date(date).toLocaleString(locale, options));
  }, [date, locale, options]);

  return formatted ?? null;
}
