'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  overlay?: boolean;
};

export function Spinner(props: Props) {
  const timer = useRef<number | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      timer.current = window.setTimeout(() => setVisible(true), 800);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={props.overlay ? 'fixed inset-0 z-1000 bg-white/50' : undefined}
    >
      <div
        className={`
          mx-auto h-5 w-12 text-center text-sm
          ${
            props.overlay ? 'absolute top-1/2 left-1/2 -translate-1/2' : 'mt-24'
          }
        `}
      >
        <svg
          className="size-8 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
}
