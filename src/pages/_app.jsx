import '../styles/globals.scss'
import splitbee from '@splitbee/web'
import { StarknetReactProvider } from '@web3-starknet-react/core'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'starknet'

import Layout from 'layout/index.tsx'

import defaultSEOConfig from '../../next-seo.config'

import Web3ReactManager from 'components/Web3ReactManager'
import { useStore } from 'stores/reduxStore'
import { BlockHashProvider } from 'context/BlockProvider'
import { TransactionsProvider } from 'context/TransactionsProvider'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../utils/apollo'
import { WalletProvider } from 'context/WalletProvider'

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

    // || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const getToken = () => {
    return typeof window !== 'undefined' && localStorage.getItem('token')
  }
  const apolloClient = useApollo(pageProps.initialApolloState, {
    getToken,
  })

  const store = useStore(pageProps.initialReduxState)

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <StarknetReactProvider getLibrary={getLibrary}>
          <Web3ReactProviderDefault getLibrary={getLibrary}>
            <Web3ReactManager>
              <BlockHashProvider>
                <TransactionsProvider>
                  <WalletProvider>
                    <NextSeo {...defaultSEOConfig} />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </WalletProvider>
                </TransactionsProvider>
              </BlockHashProvider>
            </Web3ReactManager>
          </Web3ReactProviderDefault>
        </StarknetReactProvider>
      </ApolloProvider>
    </ReduxProvider>
  )
}

export default MyApp
