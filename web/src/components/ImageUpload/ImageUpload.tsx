'use client';

import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

import { cn } from '@/lib/utils';

type Props = {
  imageUrl?: string;
  onImageChange: (data: File) => void;
};

export function ImageUpload(props: Props) {
  const [image, setImage] = useState<string>();

  useEffect(
    () => () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    },
    [image],
  );

  function handleDrop(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    setImage(URL.createObjectURL(file));

    props.onImageChange(file);
  }

  const src = image || props.imageUrl;

  return (
    <div className="overflow-hidden">
      <Dropzone accept={{ 'image/*': [] }} multiple={false} onDrop={handleDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => (
          <div
            {...getRootProps()}
            className={cn(
              `
                group relative size-51 cursor-pointer rounded border-2
                border-dashed border-gray-500
              `,
              isDragAccept && 'border-solid border-green-500',
              isDragReject && 'border-solid border-red-500',
            )}
          >
            <input {...getInputProps()} />
            {src && (
              <div
                className="absolute z-20 size-50 rounded bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            )}
            <div
              className={cn(
                `
                  absolute z-10 flex size-50 items-center justify-center rounded
                  bg-white/30 text-center font-bold text-black
                  group-hover:z-30
                `,
                isDragActive && 'z-30',
              )}
            >
              Klikni nebo sem přetáhni obrázek
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
