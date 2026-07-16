import { Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

import { RecipeDelete } from './RecipeDelete';

type Props = {
  id: string;
  slug: string;
  title: string;
  authorUsername?: string;
};

/**
 * Edit/delete controls shown only to the recipe's author (or an admin). Reads
 * the auth cookie, so it must be rendered inside a `<Suspense>` boundary — this
 * keeps the recipe detail page itself static/prerenderable while these controls
 * stream in per request.
 */
export async function RecipeAuthorControls({
  id,
  slug,
  title,
  authorUsername,
}: Props) {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  const isAuthor =
    !!currentUser &&
    (currentUser.isAdmin || currentUser.username === authorUsername);

  if (!isAuthor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Link href={`/recept/${slug}/upravit`}>
        <Button variant="ghost" size="icon" aria-label="Upravit">
          <Pencil className="size-5" />
        </Button>
      </Link>
      <RecipeDelete id={id} title={title} />
    </div>
  );
}
