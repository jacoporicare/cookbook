import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = LinkProps & {
  active?: boolean;
  children: ReactNode;
};

function NavLink({ active, children, ...linkProps }: Props) {
  return (
    <Link
      {...linkProps}
      className={cn(
        `
          block px-2 py-1 text-xl font-light whitespace-nowrap text-white
          no-underline
        `,
        'lg:p-2',
        `
          relative
          after:mt-1 after:block after:h-1 after:w-full after:content-[""]
        `,
        'after:transition-transform after:duration-250 after:ease-out',
        'after:origin-left after:bg-primary',
        active ? 'after:scale-x-100' : 'after:scale-x-0',
        'hover:text-white hover:no-underline hover:after:scale-x-100',
      )}
    >
      {children}
    </Link>
  );
}

export default NavLink;
