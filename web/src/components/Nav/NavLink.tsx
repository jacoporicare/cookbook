import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = LinkProps & {
  active?: boolean;
  children: ReactNode;
};

export function NavLink({ active, children, ...linkProps }: Props) {
  return (
    <Link
      {...linkProps}
      className={cn(
        `
          relative block px-2 py-1 text-xl font-light whitespace-nowrap
          text-white no-underline
          after:absolute after:left-0 after:block after:h-1 after:w-full
          after:origin-left after:bg-gray-500 after:transition
          after:duration-250 after:ease-out after:content-[""]
          hover:text-white hover:no-underline hover:after:scale-x-100
          hover:after:bg-gray-200
          lg:p-2
        `,
        active ? 'after:scale-x-100' : 'after:scale-x-0',
      )}
    >
      {children}
    </Link>
  );
}
