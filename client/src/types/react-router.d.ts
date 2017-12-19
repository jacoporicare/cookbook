import { LinkProps } from 'react-router';

declare module 'react-router/lib/Link' {
  interface LinkProps {
    styleName?: string;
  }
}
