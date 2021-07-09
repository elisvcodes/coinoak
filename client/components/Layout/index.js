import React from 'react';
import Head from 'next/head';
import Header from './Header/index';
import Container from '@material-ui/core/Container';
export default function Layout({ pageName, sidebar, children }) {
  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <Container>
        <div>{children}</div>
      </Container>
    </>
  );
}
