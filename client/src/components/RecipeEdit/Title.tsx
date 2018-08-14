import React from 'react';

import { AutosuggestChangeEventHandler } from '../../types';

type Props = {
  title?: string;
  onChange: AutosuggestChangeEventHandler;
};

export class Title extends React.Component<Props> {
  titleInput?: HTMLInputElement | null;

  componentDidMount() {
    if (this.titleInput) {
      this.titleInput.focus();
    }
  }

  render() {
    const { title = '', onChange } = this.props;

    return (
      <div className={`form-group ${!title ? 'has-error' : ''}`}>
        <input
          ref={titleInput => {
            this.titleInput = titleInput;
          }}
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className="form-control"
          placeholder="Název"
        />
        {!title && <span className="text-danger">Název je povinný</span>}
      </div>
    );
  }
}
