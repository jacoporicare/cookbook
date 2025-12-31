import { HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  defaultValue: string;
  onChange: () => void;
};

export function Directions({ defaultValue, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Textarea
        id="directions"
        name="directions"
        className="border-0 p-0 shadow-none focus-visible:ring-0"
        defaultValue={defaultValue}
        rows={10}
        onChange={onChange}
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
