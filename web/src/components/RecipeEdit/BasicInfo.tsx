import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { sortLocaleInsensitive } from '@/lib/utils';

type Props = {
  defaultPreparationTime: string;
  defaultServingCount: string;
  defaultSideDish: string;
  sideDishOptions: string[];
  tagOptions: string[];
  tags: string[];
  onChange: () => void;
  onTagsChange: (tags: string[]) => void;
};

export function BasicInfo({
  defaultPreparationTime,
  defaultServingCount,
  defaultSideDish,
  sideDishOptions,
  tagOptions,
  tags,
  onChange,
  onTagsChange,
}: Props) {
  const [newTagValue, setNewTagValue] = useState('');

  const allTags = sortLocaleInsensitive([...new Set([...tags, ...tagOptions])]);

  function handleTagToggle(tag: string, checked: boolean) {
    if (checked) {
      onTagsChange([...tags, tag]);
    } else {
      onTagsChange(tags.filter((t) => t !== tag));
    }
  }

  function handleAddTag() {
    const trimmed = newTagValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([trimmed, ...tags]);
      setNewTagValue('');
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="preparationTime">Doba přípravy</Label>
        <div className="relative">
          <Input
            id="preparationTime"
            name="preparationTime"
            type="number"
            min={1}
            defaultValue={defaultPreparationTime}
            className="pr-12"
            onChange={onChange}
          />
          <span
            className={`
              absolute top-1/2 right-3 -translate-y-1/2 text-sm
              text-muted-foreground
            `}
          >
            min
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="servingCount">Počet porcí</Label>
        <Input
          id="servingCount"
          name="servingCount"
          type="number"
          min={1}
          defaultValue={defaultServingCount}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sideDish">Příloha</Label>
        <Input
          id="sideDish"
          name="sideDish"
          list="sideDishOptions"
          defaultValue={defaultSideDish}
          onChange={onChange}
        />
        <datalist id="sideDishOptions">
          {sideDishOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <Label>Štítky</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-auto min-h-9 w-full justify-start py-2 font-normal"
            >
              {tags.length > 0 ? (
                <span className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </span>
              ) : (
                <span className="text-muted-foreground">Vybrat štítky...</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Přidat nový štítek..."
                  value={newTagValue}
                  onChange={(e) => setNewTagValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddTag}
                >
                  Přidat
                </Button>
              </div>
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {allTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={tags.includes(tag)}
                      onCheckedChange={(checked) =>
                        handleTagToggle(tag, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="cursor-pointer font-normal"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
