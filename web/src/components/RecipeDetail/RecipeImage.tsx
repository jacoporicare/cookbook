'use client';

import Image from 'next/image';
import { type MouseEvent, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type Props = {
  imageUrl: string;
  imageFullUrl?: string;
  title: string;
};

export function RecipeImage(props: Props) {
  const { imageUrl, imageFullUrl, title } = props;

  // imageFullUrl is the S3 prefix; the plain <a> (open-in-new-tab / no-JS
  // fallback) needs a concrete file, so point it at the largest rendition.
  const fullHref = imageFullUrl ? `${imageFullUrl}/1920.webp` : undefined;

  const [isImageOpen, setIsImageOpen] = useState(false);

  function handleImageClick(e: MouseEvent) {
    e.preventDefault();
    setIsImageOpen(true);
  }

  return (
    <>
      <a
        href={fullHref}
        className="block cursor-pointer leading-none"
        onClick={handleImageClick}
      >
        <Image
          alt={title}
          src={imageUrl}
          className="w-full rounded"
          width={800}
          height={800}
          sizes="(min-width: 768px) 17vw, 100vw"
        />
      </a>
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
