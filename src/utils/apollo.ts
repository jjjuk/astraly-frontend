import { useMemo } from 'react'
import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getConfig from 'next/config'

let apolloClient: ApolloClient<any> | undefined

function createApolloClient({ getToken }: CreateApolloOptions) {
  const { publicRuntimeConfig } = getConfig()

  // recommended way to do it according to official sources
  // previous version wasn't updating token after 3rd party oauth
  const httpLink = createHttpLink({
    uri: publicRuntimeConfig?.NEXT_PUBLIC_API_URL ?? 'http://localhost:4004/api/graphql',
  })
  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export type CreateApolloOptions = {
  getToken: () => string | null
}

export function initializeApollo(initialState: any | null = null, options: CreateApolloOptions) {
  const _apolloClient = apolloClient ?? createApolloClient(options)

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState: any, options: CreateApolloOptions) {
  const store = useMemo(() => initializeApollo(initialState, options), [initialState])
  return store
}
