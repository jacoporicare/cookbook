import Head from 'next/head';

type Props = {
  title?: string;
};

function DocumentTitle({ title }: Props) {
  return (
    <Head>
      <title>{title ? `${title} - Žrádelník` : 'Žrádelník'}</title>
    </Head>
  );
}

export default DocumentTitle;
