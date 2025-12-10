import RecipeEditPage from '../../../novy-recept/RecipeEditPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Upravit ${slug}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <RecipeEditPage slug={slug} />;
}
