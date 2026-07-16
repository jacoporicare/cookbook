import { cacheLife } from 'next/cache';

export async function Footer() {
  'use cache';
  // The copyright year is the only dynamic bit; caching with a daily lifetime
  // keeps `new Date()` deterministic for prerendering (Cache Components forbids
  // reading the current time in an uncached render).
  cacheLife('days');
  const year = new Date().getFullYear();

  return (
    <div className="flex items-center">
      <div className="flex-1">© {year} · Žrádelník</div>
    </div>
  );
}
