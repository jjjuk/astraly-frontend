import { gql } from '@apollo/client'
import { UserFragment } from './fragments'

export const UPDATE_PROFILE = gql`
  ${UserFragment}
  mutation UpdateProfile($data: UpdateAccountInputType!) {
    updateAccount(data: $data) {
      ...User
    }
  }
`
