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

export function formatTemperature(temp: number): string {
  return Number.isInteger(temp)
    ? String(temp)
    : temp.toFixed(1).replace('.', ',');
}

export function formatTemperatureRange(
  temp: number,
  toTemp?: number | null,
): string {
  if (typeof toTemp === 'number') {
    return `${formatTemperature(temp)}–${formatTemperature(toTemp)}°C`;
  }
  return `${formatTemperature(temp)}°C`;
}

export function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0 && minutes === 0) {
    return `${hours} h`;
  }

  if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}
