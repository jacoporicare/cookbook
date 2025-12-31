'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TagOption = {
  value: string;
  label: string;
};

type Props = {
  tagOptions: TagOption[];
  selectedTag: string | null;
};

export function TagFilter({ tagOptions, selectedTag }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handleTagChange(value: string) {
    if (value === '__clear__') {
      router.push(pathname);
    } else {
      router.push(`${pathname}?stitek=${value}`);
    }
  }

  return (
    <div
      className={`
        -mt-4 mb-6 flex justify-end
        sm:-mt-8
      `}
    >
      <div className="max-w-100 min-w-50 flex-auto">
        <Label
          htmlFor="tag"
          className={`mb-1 block text-sm text-muted-foreground`}
        >
          Štítek
        </Label>
        <Select value={selectedTag ?? ''} onValueChange={handleTagChange}>
          <SelectTrigger id="tag" className="w-full">
            <SelectValue placeholder="Vyberte štítek..." />
          </SelectTrigger>
          <SelectContent>
            {selectedTag && (
              <SelectItem value="__clear__" className="text-muted-foreground">
                Zrušit filtr
              </SelectItem>
            )}
            {tagOptions.map((tag) => (
              <SelectItem key={tag.value} value={tag.value}>
                {tag.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
