import '../styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import splitbee from '@splitbee/web'
import { StarknetReactProvider, createStarknetReactRoot } from '@web3-starknet-react/core'
import { NextSeo } from 'next-seo'
// import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'starknet'
import Layout from 'layout/index.tsx'

import defaultSEOConfig from '../../next-seo.config'
import customTheme from '../styles/customTheme'

// import starknet.js

import Web3ReactManager from 'components/Web3ReactManager'
import { useStore } from 'stores/reduxStore'
import { useRouter } from 'next/router'
import UiActions from '../actions/ui.actions'
import { PAGES } from '../constants/ui.constants'
import { useAppDispatch } from '../hooks/hooks'
import { BlockHashProvider } from 'context/BlockProvider'
import { TransactionsProvider } from 'context/TransactionsProvider'

function getLibrary(provider, connector) {
  return new Provider(provider)
}

const Web3ReactProviderDefault = dynamic(() => import('../components/defaultprovider'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
      token: 'FVZ18D6TRP3C',
    })
  }, [])

  const store = useStore(pageProps.initialReduxState)

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={customTheme}>
        <StarknetReactProvider getLibrary={getLibrary}>
          <BlockHashProvider>
            <TransactionsProvider>
              <Web3ReactProviderDefault getLibrary={getLibrary}>
                <Web3ReactManager>
                  <NextSeo {...defaultSEOConfig} />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Web3ReactManager>
              </Web3ReactProviderDefault>
            </TransactionsProvider>
          </BlockHashProvider>
        </StarknetReactProvider>
      </ChakraProvider>
    </ReduxProvider>
  )
}

export default MyApp
