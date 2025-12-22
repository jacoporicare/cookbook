'use client';

import { useEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type TitleFields = 'title';

type Props = {
  title?: string;
  onChange: (name: TitleFields, value: string) => void;
};

function Title({ title = '', onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="title">Název</Label>
      <Input
        ref={ref}
        id="title"
        value={title}
        className={!title ? 'border-destructive' : ''}
        onChange={(e) => onChange('title', e.currentTarget.value)}
      />
      {!title && <p className="text-sm text-destructive">Název je povinný</p>}
    </div>
  );
}

export default Title;
