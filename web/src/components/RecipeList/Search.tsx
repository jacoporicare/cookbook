'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  multipleSelected: boolean;
  selectedTags: string[];
  tagOptions: { value: string; label: string }[];
  onSearch: (tags: string[]) => void;
  onMatchAllChange: (matchAll: boolean) => void;
};

export function Search(props: Props) {
  const [open, setOpen] = useState(false);

  const toggleTag = (tagValue: string) => {
    const newTags = props.selectedTags.includes(tagValue)
      ? props.selectedTags.filter((t) => t !== tagValue)
      : [...props.selectedTags, tagValue];
    props.onSearch(newTags);
  };

  const removeTag = (tagValue: string) => {
    props.onSearch(props.selectedTags.filter((t) => t !== tagValue));
  };

  return (
    <div
      className={`
        -mt-4 mb-6 flex justify-end
        sm:-mt-8
      `}
    >
      <div className="max-w-100 min-w-50 flex-auto">
        <Label
          htmlFor="tags"
          className="mb-1 block text-sm text-muted-foreground"
        >
          Štítky
        </Label>
        <Select open={open} onOpenChange={setOpen}>
          <SelectTrigger id="tags" className="h-auto min-h-10.5 w-full">
            {props.selectedTags.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {props.selectedTags.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(value);
                    }}
                  >
                    {props.tagOptions.find((o) => o.value === value)?.label}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
              </div>
            ) : (
              <SelectValue placeholder="Vyberte štítky..." />
            )}
          </SelectTrigger>
          <SelectContent>
            {props.tagOptions.map((tag) => (
              <div
                key={tag.value}
                className={`
                  flex cursor-pointer items-center rounded-sm px-2 py-1.5
                  hover:bg-accent
                `}
                onClick={() => toggleTag(tag.value)}
              >
                <Checkbox
                  checked={props.selectedTags.includes(tag.value)}
                  className="mr-2"
                />
                <span
                  className={
                    props.selectedTags.includes(tag.value)
                      ? 'font-medium'
                      : 'font-normal'
                  }
                >
                  {tag.label}
                </span>
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
      {props.multipleSelected && (
        <div className="ml-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="matchAll"
              onCheckedChange={(checked) =>
                props.onMatchAllChange(checked === true)
              }
            />
            <Label htmlFor="matchAll" className="cursor-pointer">
              Pouze všechny
            </Label>
          </div>
        </div>
      )}
    </div>
  );
}
