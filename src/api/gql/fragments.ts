import { gql } from '@apollo/client'

export const ProjectFragment = gql`
  fragment Project on Project {
    _id
    name
    description
    ticker
    logo
    cover
    totalRaise
    maxAllocation
    currentRoundIndex
    tokenPrice
    type
    categories
    rounds {
      title
      description
      startDate
      endDate
    }
    idoId
    isFinished
  }
`

export const UserFragment = gql`
  fragment User on Account {
    _id
    address
    alias
    avatar
    bannerHash
    bio
    cover
    email
    nonce
    questCompleted {
      _id
    }
  }
`

export const QuestFragment = gql`
  fragment Quest on Quest {
    _id
    description
    idoId
    isClaimed
    link
    name
    type
    event {
      callData {
        name
        type
        value {
          high
          low
        }
      }
      name
      transmitterContract
    }
  }
`
