import { useCallback, useState } from 'react';

export type DisplayMode = 'grid' | 'list';

export function useDisplayMode(initial: DisplayMode = 'grid') {
  const [mode, setMode] = useState<DisplayMode>(initial);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  }, []);

  return [mode, toggleMode] as const;
}
