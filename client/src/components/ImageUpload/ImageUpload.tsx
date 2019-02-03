import React from 'react';
import Dropzone from 'react-dropzone';
import styled, { css } from 'react-emotion';

type Props = {
  imageUrl?: string;
  onImageChange: (data: ArrayBuffer) => void;
};

type State = {
  image?: string;
};

const text = css`
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  z-index: 1;
`;

const Preview = styled('div')`
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  z-index: 2;
`;

type DropzonePlaceProps = {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
};
const DropzonePlace = styled('div')<DropzonePlaceProps>(props => [
  {
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
    [`&:hover .${text}`]: {
      zIndex: 3,
    },
  },
  props.isDragActive && {
    [`.${text}`]: {
      zIndex: 3,
    },
  },
  props.isDragAccept && {
    borderStyle: 'solid',
    borderColor: 'rgb(63, 195, 0)',
  },
  props.isDragReject && {
    borderStyle: 'solid',
    borderColor: 'rgb(195, 31, 31)',
  },
]);

export class ImageUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { image: undefined };
  }

  componentWillUnmount() {
    if (this.state.image) {
      URL.revokeObjectURL(this.state.image);
    }
  }

  handleDrop = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    this.setState({ image: URL.createObjectURL(file) });

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'object') {
        this.props.onImageChange(reader.result);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    const src = this.state.image || this.props.imageUrl;

    return (
      <Dropzone multiple={false} onDrop={this.handleDrop} accept="image/*">
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
          <DropzonePlace
            {...getRootProps({ refKey: 'innerRef' })}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {src && <Preview style={{ backgroundImage: `url(${src})` }} />}
            <div className={text}>Klikni nebo sem přetáhni obrázek</div>
          </DropzonePlace>
        )}
      </Dropzone>
    );
  }
}
