import { gql } from '@apollo/client'
import { ProjectFragment, QuestFragment, UserFragment } from './fragments'

export const UPDATE_PROFILE = gql`
  ${UserFragment}
  mutation UpdateProfile($data: UpdateAccountInputType!) {
    updateAccount(data: $data) {
      ...User
    }
  }
`

export const REQUEST_PASSWORD_RESET = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, newPassword: $password)
  }
`

export const UPDATE_QUEST = gql`
  ${QuestFragment}
  mutation UpdateQuest($data: QuestInput!) {
    updateQuest(data: $data) {
      ...Quest
    }
  }
`
export const LINK_SOCIAL = gql`
  ${UserFragment}
  mutation linkSocial($id: String, $type: String!) {
    linkSocial(type: $type, id: $id) {
      ...User
    }
  }
`

export const NEWSLETTER = gql`
  mutation newsletter($email: String!) {
    newsletter(email: $email)
  }
`

export const UPDATE_PROJECT = gql`
  ${ProjectFragment}
  mutation UpdateProject($data: ProjectInput!) {
    updateProject(data: $data) {
      ...Project
    }
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`
