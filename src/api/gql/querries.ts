import { gql } from '@apollo/client'
import { ProjectFragment, QuestFragment } from './fragments'

export const SEARCH_PROJECTS = gql`
  ${ProjectFragment}
  query SearchProjects($finished: Boolean, $search: String) {
    searchProjects(finished: $finished, search: $search) {
      ...Project
    }
  }
`

export const PROJECTS = gql`
  ${ProjectFragment}
  ${QuestFragment}
  query Projects {
    projects {
      ...Project
      quests {
        ...Quest
      }
    }
  }
`

export const PROJECT = gql`
  ${ProjectFragment}
  query Project($idoId: String!) {
    project(idoId: $idoId) {
      ...Project
    }
  }
`

export const QUESTS = gql`
  ${QuestFragment}
  query Quests($idoId: String) {
    quests(idoId: $idoId) {
      ...Quest
    }
  }
`

export const QUEST = gql`
  ${QuestFragment}
  query Quest($_id: String!) {
    quest(_id: $_id) {
      ...Quest
    }
  }
`

export const IS_ADMIN = gql`
  query IsAdmin {
    isAdmin
  }
`
