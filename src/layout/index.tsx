import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import {Container} from '@chakra-ui/react';
import {ContractInterface} from 'starknet';

export const siteTitle = 'zkPad';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Container maxW={{base: '100%', md: '90%'}}>
        <Header />
        <>{children}</>
        <Footer />
      </Container>
    </>
  );
}
