import React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone';

import './styles/ImageUpload.module.css';

type Props = {
  imageUrl?: string;
  onImageChange: (data: ArrayBuffer) => void;
};

type State = {
  image?: string;
};

class ImageUpload extends React.Component<Props, State> {
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
      this.props.onImageChange(reader.result);
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    const src = this.state.image || this.props.imageUrl;

    return (
      <React.Fragment>
        <div styleName="upload">
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
            {src && <div styleName="preview" style={{ backgroundImage: `url(${src})` }} />}
            <div styleName="upload-text">Klikni nebo sem přetáhni obrázek</div>
          </Dropzone>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUpload;
