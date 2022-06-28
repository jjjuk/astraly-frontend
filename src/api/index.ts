import { UserFragment } from './gql/fragments'

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'

// const corsHeader = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
// }

import { ApolloClient, InMemoryCache, gql, ApolloLink, concat, HttpLink } from '@apollo/client'
import getConfig from 'next/config'

export const useApi = () => {
  const { publicRuntimeConfig } = getConfig()

  const apiUrl = publicRuntimeConfig?.NEXT_PUBLIC_API_URL ?? 'http://localhost:4004/api/graphql'

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
          ${UserFragment}
          query me {
            me {
              ...User
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

  const getUploadUrl = async (file: string) => {
    return client
      .query({
        variables: {
          fileType: file,
        },
        query: gql`
          query GetUploadUrl($fileType: String!) {
            getUploadUrl(fileType: $fileType)
          }
        `,
      })
      .then(({ data }) => data.getUploadUrl)
  }

  return { getAuthToken, getAccountDetails, validateQuest, fetchProof, getUploadUrl }
}
