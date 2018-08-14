import React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone';
import styled from 'react-emotion';

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

const Container = styled.div`
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

  handleDrop = (files: ImageFile[]) => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    this.setState({ image: file.preview });

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
      <Container>
        <Dropzone
          multiple={false}
          onDrop={this.handleDrop}
          accept="image/*"
          style={{
            width: 204,
            height: 204,
            borderWidth: 2,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 4,
            cursor: 'pointer',
          }}
          acceptStyle={{
            borderStyle: 'solid',
            borderColor: 'rgb(63, 195, 0)',
          }}
          rejectStyle={{
            borderStyle: 'solid',
            borderColor: 'rgb(195, 31, 31)',
          }}
        >
          {src && <Preview style={{ backgroundImage: `url(${src})` }} />}
          <Text>Klikni nebo sem přetáhni obrázek</Text>
        </Dropzone>
      </Container>
    );
  }
}
