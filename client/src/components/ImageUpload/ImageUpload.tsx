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

const Text = styled.div`
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

const Wrapper = styled.div`
  float: right;
  margin-left: 15px;
  position: relative;

  &:hover ${Text} {
    z-index: 3;
  }
`;

const Preview = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  z-index: 2;
`;

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
      <Wrapper>
        <Dropzone
          multiple={false}
          onDrop={this.handleDrop}
          accept="image/*"
          className={css`
            width: 204px;
            height: 204px;
            border-width: 2px;
            border-color: rgb(102, 102, 102);
            border-style: dashed;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
          `}
          acceptClassName={css`
            border-style: solid;
            border-color: rgb(63, 195, 0);
          `}
          rejectClassName={css`
            border-style: solid;
            border-color: rgb(195, 31, 31);
          `}
        >
          {src && <Preview style={{ backgroundImage: `url(${src})` }} />}
          <Text>Klikni nebo sem přetáhni obrázek</Text>
        </Dropzone>
      </Wrapper>
    );
  }
}
