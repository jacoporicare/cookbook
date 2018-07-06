declare module 'react-notify-toast' {
  import * as React from 'react';

  export = Notifications;

  namespace Notifications {
    interface Color {
      color: string;
      backgroundColor: string;
    }

    interface Colors {
      error: Color;
      success: Color;
      warning: Color;
      info: Color;
    }

    interface Options {
      wrapperId?: string;
      animationDuration?: number;
      timeout?: number;
      zIndex?: number;
      colors?: Colors;
    }

    interface Props {
      options?: Options;
    }

    namespace notify {
      interface Color {
        background: string;
        text: string;
      }

      type Type = 'success' | 'warning' | 'error' | 'custom';

      function show(message: string, type?: Type, timeout?: number, color?: Color): void;
    }
  }

  class Notifications extends React.Component<Notifications.Props> {}
}
