import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

type Props = {
  imageUrl?: string;
  onImageChange: (data: File) => void;
};

const useStyles = makeStyles({
  text: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    zIndex: 1,
  },
  preview: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: '4px',
    zIndex: 2,
  },
  dropzone: {
    float: 'right',
    marginLeft: '15px',
    position: 'relative',
    width: '204px',
    height: '204px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '4px',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [Text as any]: {
        zIndex: 3,
      },
    },
  },
  active: {
    '& $text': {
      zIndex: 3,
    },
  },
  accept: {
    borderStyle: 'solid',
    borderColor: 'rgb(63, 195, 0)',
  },
  reject: {
    borderStyle: 'solid',
    borderColor: 'rgb(195, 31, 31)',
  },
});

function ImageUpload(props: Props) {
  const classes = useStyles();

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
    <Dropzone accept="image/*" multiple={false} onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
        <div
          {...getRootProps()}
          className={classNames(classes.dropzone, {
            [classes.accept]: isDragAccept,
            [classes.active]: isDragActive,
            [classes.reject]: isDragReject,
          })}
        >
          <input {...getInputProps()} />
          {src && <div className={classes.preview} style={{ backgroundImage: `url(${src})` }} />}
          <div className={classes.text}>Klikni nebo sem přetáhni obrázek</div>
        </div>
      )}
    </Dropzone>
  );
}

export default ImageUpload;
