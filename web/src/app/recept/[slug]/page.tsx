import RecipeDetailPage from './RecipeDetailPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: slug,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <RecipeDetailPage slug={slug} />;
}
