import Document, { Html, Head, Main, NextScript } from 'next/document';

class CookbookDocument extends Document {
  render() {
    return (
      <Html lang="cs">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CookbookDocument;
