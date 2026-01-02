import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortLocaleInsensitive(arr: string[]): string[] {
  return [...arr].sort((a, b) =>
    a.toLocaleLowerCase('cs').localeCompare(b.toLocaleLowerCase('cs'), 'cs'),
  );
}
