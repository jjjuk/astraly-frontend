import '../styles/globals.scss';
import {ChakraProvider} from '@chakra-ui/react';
import splitbee from '@splitbee/web';
import {StarknetReactProvider, createStarknetReactRoot} from '@web3-starknet-react/core';
import {NextSeo} from 'next-seo';
// import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {useEffect} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider} from 'starknet';

import defaultSEOConfig from '../../next-seo.config';
import customTheme from '../styles/customTheme';

// import starknet.js

import Web3ReactManager from 'components/Web3ReactManager';
import {useStore} from 'stores/reduxStore';

function getLibrary(provider, connector) {
  return new Provider(provider);
}

const Web3ReactProviderDefault = dynamic(() => import('../components/defaultprovider'), {
  ssr: false
});

function MyApp({Component, pageProps}) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive'
    });
  }, []);

  const store = useStore(pageProps.initialReduxState);

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={customTheme}>
        <StarknetReactProvider getLibrary={getLibrary}>
          <Web3ReactProviderDefault getLibrary={getLibrary}>
            <Web3ReactManager>
              <NextSeo {...defaultSEOConfig} />
              <Component {...pageProps} />
            </Web3ReactManager>
          </Web3ReactProviderDefault>
        </StarknetReactProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default MyApp;
