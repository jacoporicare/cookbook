import Markdown from 'react-native-markdown-display';
import { useResolveClassNames } from 'uniwind';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  directions: string;
};

export function RecipeDetailDirections({ directions }: Props) {
  const markdownStyles = {
    heading2: useResolveClassNames('text-xl font-bold mb-2'),
    body: useResolveClassNames('text-base leading-6 text-card-foreground'),
    paragraph: useResolveClassNames('mt-0 mb-3'),
    strong: useResolveClassNames('font-bold'),
    link: useResolveClassNames('text-ring'),
    list_item: useResolveClassNames('mb-1'),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Postup</CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown style={markdownStyles}>{directions}</Markdown>
      </CardContent>
    </Card>
  );
}
