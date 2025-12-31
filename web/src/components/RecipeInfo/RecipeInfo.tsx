import { ReactNode } from 'react';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: ReactNode;
  small?: boolean;
};

function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0 && minutes === 0) {
    return `${hours} h`;
  }

  if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}

export function RecipeInfo({
  preparationTime,
  sideDish,
  placeholder,
  small,
}: Props) {
  if (!preparationTime && !sideDish) {
    return placeholder ? (
      <p className="text-muted-foreground">{placeholder}</p>
    ) : null;
  }

  return (
    <ul className="m-0 list-none p-0">
      {!!preparationTime && preparationTime > 0 && (
        <li
          className={`
            inline-block
            [&+&]:ml-1 [&+&]:before:mr-1 [&+&]:before:inline-block
            [&+&]:before:content-['·']
          `}
        >
          {!small && (
            <span className="text-muted-foreground">Doba přípravy </span>
          )}
          <span className={small ? 'text-sm text-muted-foreground' : ''}>
            {formatTime(preparationTime)}
          </span>{' '}
        </li>
      )}
      {!!sideDish && (
        <li
          className={`
            inline-block
            [&+&]:ml-1 [&+&]:before:mr-1 [&+&]:before:inline-block
            [&+&]:before:content-['·']
          `}
        >
          {!small && <span className="text-muted-foreground">Příloha </span>}
          <span className={small ? 'text-sm text-muted-foreground' : ''}>
            {sideDish}
          </span>
        </li>
      )}
    </ul>
  );
}
