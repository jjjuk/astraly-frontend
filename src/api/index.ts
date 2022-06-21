const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'

// const corsHeader = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
// }

import { ApolloClient, InMemoryCache, gql, ApolloLink, concat, HttpLink } from '@apollo/client'

export const useApi = () => {
  const apiUrl = isMainnet
    ? 'https://zkpad-api.herokuapp.com/api/graphql'
    : 'https://zkpad-api.herokuapp.com/api/graphql'

  const httpLink = new HttpLink({ uri: apiUrl })

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
    return forward(operation)
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  })

  const getAuthToken = async (address: string | null | undefined) => {
    // console.log('getAuthToken', address)
    return client
      .query({
        variables: {
          address,
        },
        query: gql`
          query getToken($address: String!) {
            getToken(address: $address)
          }
        `,
      })
      .then(({ data }) => {
        console.log({
          data,
        })
        if (data.getToken) {
          const token = data.getToken
          localStorage.setItem('token', token)
          return token
        }

        return null
      })
  }

  const getAccountDetails = async () => {
    return client
      .query({
        query: gql`
          query me {
            me {
              _id
              address
              alias
              bannerHash
              bio
              email
              nonce
              questCompleted {
                _id
                idoId
              }
            }
          }
        `,
      })
      .then(({ data }) => data.me)
  }

  const validateQuest = async (questId: string) => {
    return client
      .mutate({
        variables: {
          questId,
        },
        mutation: gql`
          mutation completeQuest($questId: String!) {
            completeQuest(questId: $questId) {
              _id
              idoId
            }
          }
        `,
      })
      .then(({ data }) => data.completeQuest)
  }

  const fetchProof = async (idoId: string) => {
    return client
      .query({
        variables: {
          idoId,
        },
        query: gql`
          query getMerkleProof($idoId: String!) {
            getMerkleProof(idoId: $idoId)
          }
        `,
      })
      .then(({ data }) => data.getMerkleProof)
  }

  return { getAuthToken, getAccountDetails, validateQuest, fetchProof }
}
