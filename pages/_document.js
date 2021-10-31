import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
<>
    <Html>
        <Head>
        <meta name="description" content="A website that structure data received by hackNews API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Html>
    <body>
      <Main />
      <NextScript />
    </body>
</>
)

export default Document;