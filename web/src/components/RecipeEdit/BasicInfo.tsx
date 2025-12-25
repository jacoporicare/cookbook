import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { INSTANT_POT_TAG } from '../../const';

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
  const filteredTags = tags.filter((t) => t !== INSTANT_POT_TAG);
  const filteredTagOptions = tagOptions.filter((t) => t !== INSTANT_POT_TAG);

  function handleTagToggle(tag: string, checked: boolean) {
    if (checked) {
      onTagsChange([...tags, tag]);
    } else {
      onTagsChange(tags.filter((t) => t !== tag));
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
        {filteredTags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {filteredTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="space-y-2">
          {filteredTagOptions.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag}`}
                checked={filteredTags.includes(tag)}
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

      <div className="flex items-center space-x-2">
        <Switch
          id="instantPot"
          checked={tags.includes(INSTANT_POT_TAG)}
          onCheckedChange={(checked) =>
            onTagsChange(
              checked
                ? [...tags, INSTANT_POT_TAG]
                : tags.filter((t) => t !== INSTANT_POT_TAG),
            )
          }
        />
        <Label htmlFor="instantPot" className="cursor-pointer">
          Instant Pot recept
        </Label>
      </div>
    </div>
  );
}
