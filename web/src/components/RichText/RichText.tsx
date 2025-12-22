import ReactMarkdown from 'react-markdown';

import './rich-text.css';

type Props = {
  text?: string;
};

function RichText({ text = '' }: Props) {
  return (
    // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
    <div className="rich-text">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default RichText;
