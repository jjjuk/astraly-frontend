import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import getConfig from 'next/config'

let apolloClient: ApolloClient<any> | undefined

function createApolloClient({ getToken }: CreateApolloOptions) {
  const token = getToken()
  const { publicRuntimeConfig } = getConfig()

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: new HttpLink({
      uri: publicRuntimeConfig?.NEXT_PUBLIC_API_URL ?? 'http://localhost:4004/api/graphql',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }),
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
