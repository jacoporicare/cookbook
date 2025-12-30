import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  defaultValue: string;
  onChange: () => void;
};

export function Title({ defaultValue, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Název</Label>
      <Input
        id="title"
        name="title"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
}
