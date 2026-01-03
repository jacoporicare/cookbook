import { Thermometer } from 'lucide-react';
import { Fragment } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTemperature } from '@/lib/utils';

type SousVideOption = {
  temperature: number;
  time: string;
  label: string;
};

type Props = {
  options: SousVideOption[];
};

export function SousVideList({ options }: Props) {
  if (options.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="size-5" />
          Sous-vide
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`
          grid grid-cols-[auto_auto_1fr] items-center gap-x-3 gap-y-2 text-sm
        `}
      >
        {options.map((option, index) => (
          <Fragment key={index}>
            <span className="font-medium tabular-nums">
              {formatTemperature(option.temperature)}°C
            </span>
            <span className="text-muted-foreground">{option.time}</span>
            <span>
              <span className="rounded bg-muted px-2 py-0.5">
                {option.label}
              </span>
            </span>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
