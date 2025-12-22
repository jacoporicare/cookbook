'use client';

import Image from 'next/image';
import { MouseEvent, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { Ingredient } from '../../generated/graphql';
import RichText from '../RichText/RichText';
import IngredientList from './IngredientList';

type Props = {
  title: string;
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
  isInstantPotRecipe?: boolean;
  userName: string;
};

function RecipeDetail({
  title,
  ingredients,
  servingCount,
  directions,
  lastModifiedDate,
  imageUrl,
  imageFullUrl,
  isInstantPotRecipe,
  userName,
}: Props) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  function handleImageClick(e: MouseEvent) {
    e.preventDefault();
    setIsImageOpen(true);
  }

  return (
    <>
      <div
        className={`
          grid grid-cols-1 gap-8
          md:grid-cols-12
        `}
      >
        <div
          className={`
            md:col-span-4
            lg:col-span-3
          `}
        >
          <IngredientList
            ingredients={ingredients}
            servingCount={servingCount}
          />
        </div>

        <div
          className={`
            md:col-span-6
            lg:col-span-7
          `}
        >
          <h3 className="mb-2 text-xl font-medium">Postup</h3>
          {isInstantPotRecipe && (
            <Card className="mb-6">
              <Alert>
                <AlertDescription>
                  <strong>Instant Pot</strong>
                  <br />
                  Tento recept je určený pro multifunkční hrnec Instant Pot nebo
                  jeho kopie, např. česká Tesla EliteCook K70.
                </AlertDescription>
              </Alert>
            </Card>
          )}
          <Card>
            {directions ? (
              <div className="p-6">
                <RichText text={directions} />
              </div>
            ) : (
              <Alert>
                <AlertDescription>Žádný postup.</AlertDescription>
              </Alert>
            )}
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="md:pt-10">
            {imageUrl && (
              <Card className="overflow-hidden p-0">
                <a
                  href={imageFullUrl}
                  className="block cursor-pointer leading-none"
                  onClick={handleImageClick}
                >
                  <Image
                    alt={title}
                    src={imageUrl}
                    className="w-full rounded"
                    width={800}
                    height={800}
                  />
                </a>
              </Card>
            )}
            <div className="my-4">
              <p className="text-sm text-muted-foreground">Autor:</p>
              <p>{userName}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Naposledy upraveno:
              </p>
              <p>{new Date(lastModifiedDate).toLocaleDateString('cs')}</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          <DialogTitle className="hidden">{title}</DialogTitle>
          {imageFullUrl && (
            <Image
              alt={title}
              src={imageFullUrl}
              width={1200}
              height={1200}
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RecipeDetail;
