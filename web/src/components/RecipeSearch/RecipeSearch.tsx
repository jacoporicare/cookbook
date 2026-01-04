'use client';

import { useCombobox } from 'downshift';
import { Search } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { RecipeBaseFragment } from '../../generated/graphql';
import { RecipeInfo } from '../RecipeInfo/RecipeInfo';

type Props = {
  recipes: RecipeBaseFragment[];
  onSelected: (slug: string) => void;
};

const MAX_ITEMS = 10;

export function RecipeSearch(props: Props) {
  const [prevRecipes, setPrevRecipes] = useState(props.recipes);
  const [suggestions, setSuggestions] = useState<RecipeBaseFragment[]>(
    props.recipes.slice(0, MAX_ITEMS),
  );

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    isOpen,
    openMenu,
  } = useCombobox({
    id: 'recipesearch',
    labelId: 'recipesearch-label',
    inputId: 'recipesearch-input',
    menuId: 'recipesearch-menu',
    items: suggestions,
    defaultHighlightedIndex: 0,
    itemToString: () => '',
    onInputValueChange: ({ inputValue }) => {
      setSuggestions(
        matchSorter(props.recipes, inputValue || '', { keys: ['title'] }).slice(
          0,
          MAX_ITEMS,
        ),
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        props.onSelected(selectedItem.slug);
      }
    },
  });

  if (props.recipes !== prevRecipes) {
    setPrevRecipes(props.recipes);
    setSuggestions(
      matchSorter(props.recipes, inputValue, { keys: ['title'] }).slice(
        0,
        MAX_ITEMS,
      ),
    );
  }

  return (
    <div className="relative mx-auto max-w-100">
      <div className="relative">
        <Search
          className={`
            absolute top-1/2 left-2 size-4 -translate-y-1/2 text-white
          `}
        />
        <Input
          {...getInputProps()}
          placeholder="Hledat..."
          className={`
            border-gray-600 bg-transparent pl-8 text-white
            placeholder:text-gray-400
            focus:bg-gray-800
          `}
          onFocus={() => {
            if (inputValue) {
              openMenu();
            }
          }}
        />
      </div>
      <Card
        {...getMenuProps()}
        className={cn(
          `
            fixed top-16.25 right-2 left-2 z-1001 max-h-72 overflow-x-hidden
            overflow-y-auto py-0
            sm:absolute sm:top-[calc(100%+0.25rem)] sm:right-auto sm:left-0
            sm:w-87.5
          `,
          !isOpen && 'hidden',
        )}
      >
        <ul className="divide-y">
          {inputValue && suggestions.length === 0 && (
            <li className="p-4 text-center text-muted-foreground">
              Žádné výsledky.
            </li>
          )}
          {isOpen &&
            suggestions.map((recipe, index) => {
              const { imageThumbWebPUrl, preparationTime, sideDish } = recipe;
              const imageUrl =
                imageThumbWebPUrl || '/assets/food-placeholder.webp';

              return (
                <li
                  key={recipe.id}
                  {...getItemProps({ item: recipe, index })}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 p-3',
                    highlightedIndex === index && 'bg-muted',
                  )}
                >
                  <Avatar className="size-10 rounded">
                    <AvatarImage src={imageUrl} alt={recipe.title} />
                    <AvatarFallback>{recipe.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{recipe.title}</p>
                    <RecipeInfo
                      placeholder={<span>&nbsp;</span>}
                      preparationTime={preparationTime ?? undefined}
                      sideDish={sideDish ?? undefined}
                      small
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </Card>
    </div>
  );
}
