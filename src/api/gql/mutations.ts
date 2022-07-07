import { gql } from '@apollo/client'
import { QuestFragment, UserFragment } from './fragments'

export const UPDATE_PROFILE = gql`
  ${UserFragment}
  mutation UpdateProfile($data: UpdateAccountInputType!) {
    updateAccount(data: $data) {
      ...User
    }
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
