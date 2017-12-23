import React from 'react';

import { AutosuggestChangeEventHandler } from '../../types';

interface Props {
  directions?: string;
  onChange: AutosuggestChangeEventHandler;
}

const Directions = ({ directions = '', onChange }: Props) => (
  <div className="form-group">
    <textarea
      id="directions"
      name="directions"
      value={directions}
      onChange={onChange}
      rows={20}
      className="form-control"
    />
    <div className="help-block clearfix">
      <div className="pull-right">
        <a
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Návod na Markdown
        </a>
      </div>
    </div>
  </div>
);

export default Directions;
