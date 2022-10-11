import { UserFragment } from './gql/fragments'

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'

const corsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
}

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
        ...corsHeader,
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

  const login = async (variables: { email: string; password: string }) => {
    const { data } = await client.mutate({
      variables,
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `,
    })
    if (data.login) {
      const token = data.login
      localStorage.setItem('token', token)
      return token
    }
    return null
  }

  const signup = async (variables: { email: string; password: string }) => {
    const { data } = await client.mutate({
      variables,
      mutation: gql`
        mutation signup($email: String!, $password: String!) {
          signup(email: $email, password: $password)
        }
      `,
    })
    if (data.signup) {
      const token = data.signup
      localStorage.setItem('token', token)
      return token
    }
    return null
  }

  const linkWallet = async (address?: string | null) => {
    const { data } = await client.mutate({
      variables: { address },
      mutation: gql`
        ${UserFragment}
        mutation linkWallet($address: String!) {
          linkWallet(address: $address) {
            ...User
          }
        }
      `,
    })
    return data.linkWallet
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
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => data.me)
      .catch(console.error)
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

  const getNumberQuestsCompleted = async (idoId: string) => {
    return client
      .query({
        variables: {
          idoId,
        },
        query: gql`
          query getNumberQuestsCompleted($idoId: String!) {
            getNumberQuestsCompleted(idoId: $idoId)
          }
        `,
      })
      .then(({ data }) => data.getNumberQuestsCompleted)
  }

  const getUploadUrl = async (file: string, fileType: string) => {
    return client
      .query({
        variables: {
          fileType: file,
        },
        query:
          fileType === 'image'
            ? gql`
                query GetUploadUrl($fileType: String!) {
                  getUploadUrl(fileType: $fileType)
                }
              `
            : gql`
                query GetUploadUrl($fileType: String!) {
                  getUploadUrlAdmin(fileType: $fileType)
                }
              `,
      })
      .then(({ data }) => data.getUploadUrl ?? data.getUploadUrlAdmin)
  }

  return {
    getAuthToken,
    login,
    signup,
    linkWallet,
    getAccountDetails,
    validateQuest,
    fetchProof,
    getUploadUrl,
    getNumberQuestsCompleted,
  }
}
