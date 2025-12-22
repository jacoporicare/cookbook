import { HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type DirectionsFields = 'directions';

type Props = {
  directions?: string;
  onChange: (name: DirectionsFields, value: string) => void;
};

function Directions({ directions = '', onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="directions">Postup</Label>
      <Textarea
        id="directions"
        value={directions}
        rows={10}
        onChange={(e) => onChange('directions', e.currentTarget.value)}
      />
      <div className="text-right">
        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HelpCircle className="mr-1 size-4" />
            Návod na Markdown
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Directions;
