'use client';

import { Filter, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';

import { Button } from '@/components/ui/button';

type FilterContextType = {
  visible: boolean;
  toggle: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within RecipeFilterWrapper');
  }
  return context;
}

type WrapperProps = {
  initialVisible: boolean;
  hasSelectedTag: boolean;
  children: ReactNode;
};

export function RecipeFilterWrapper({
  initialVisible,
  hasSelectedTag,
  children,
}: WrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(initialVisible);

  function toggle() {
    const newVisible = !visible;
    setVisible(newVisible);

    // Clear filter when hiding
    if (!newVisible && hasSelectedTag) {
      router.push(pathname);
    }
  }

  return (
    <FilterContext.Provider value={{ visible, toggle }}>
      {children}
    </FilterContext.Provider>
  );
}

export function FilterToggleButton() {
  const { visible, toggle } = useFilterContext();

  return (
    <Button variant="outline" onClick={toggle}>
      {visible ? (
        <X className="mr-2 size-4" />
      ) : (
        <Filter className="mr-2 size-4" />
      )}
      {visible ? 'Zrušit' : 'Filtr'}
    </Button>
  );
}

type FilterContentProps = {
  children: ReactNode;
};

export function FilterContent({ children }: FilterContentProps) {
  const { visible } = useFilterContext();

  if (!visible) {
    return null;
  }

  return <>{children}</>;
}
