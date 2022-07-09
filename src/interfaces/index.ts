import { AccountInterface, number } from 'starknet'
import { OrganizedEvent } from 'utils/types/organizedStarknet'

export interface Round {
  title: string
  description: string
  startDate: Date
  endDate: Date
}

export enum ProjectType {
  IDO = 'IDO',
  INO = 'INO',
  LBP = 'LBP',
  GDA = 'GDA',
}

export interface Project {
  _id: number
  idoId: number
  name?: string
  description?: string
  ticker?: string
  logo?: string
  cover?: string
  totalRaise?: number
  tokenAddress: string
  tokenPrice: number
  maxAllocation?: number
  currentRoundIndex: number
  type: ProjectType
  categories?: string[]
  rounds: Round[]
  quests?: Quest[]
}

export enum QuestType {
  SOCIAL = 'SOCIAL',
  PRODUCT = 'PRODUCT',
}

export interface Quest {
  _id?: string
  idoId: number
  name?: string
  description?: string
  event?: OrganizedEvent
  icon: string
  quest?: string
  reward?: string
  link: string
  isClaimed?: boolean
  type: QuestType
}
