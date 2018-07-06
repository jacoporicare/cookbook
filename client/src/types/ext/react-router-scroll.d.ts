declare module 'react-router-scroll' {
  import { Middleware } from 'react-router/lib/applyRouterMiddleware';

  export function useScroll(): Middleware;
}
