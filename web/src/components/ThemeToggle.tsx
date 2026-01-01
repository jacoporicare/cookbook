'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type Theme = 'system' | 'light' | 'dark';

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDark);
}

type Props = {
  className?: string;
};

export function ThemeToggle({ className }: Props) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    // Read initial theme from localStorage
    const stored = localStorage.theme as Theme | undefined;
    if (stored === 'dark' || stored === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(stored);
    } else {
      setTheme('system');
    }
  }, []);

  useEffect(() => {
    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const selectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);

    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }
  };

  const options: { value: Theme; icon: typeof Monitor; label: string }[] = [
    { value: 'system', icon: Monitor, label: 'Systémový režim' },
    { value: 'light', icon: Sun, label: 'Světlý režim' },
    { value: 'dark', icon: Moon, label: 'Tmavý režim' },
  ];

  return (
    <div
      className={cn(
        `cursor-pointer text-center text-[0.8em] text-gray-400`,
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1">
        {options.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => selectTheme(value)}
            aria-label={label}
            className={cn(
              'rounded p-1.5 transition-colors',
              theme === value
                ? 'text-white'
                : `
                  text-gray-400
                  hover:text-gray-200
                `,
            )}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
      Vzhled
    </div>
  );
}
