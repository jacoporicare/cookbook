'use client';

import { useEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  defaultValue: string;
  onChange: () => void;
};

export function Title({ defaultValue, onChange }: Props) {
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
        name="title"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
}
