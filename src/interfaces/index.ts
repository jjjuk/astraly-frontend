import { AccountInterface, number } from 'starknet'
import { OrganizedEvent } from 'utils/types/organizedStarknet'

export interface Round {
  title: string
  description: string
  startDate: Date
  endDate: Date
}

type ProjectType = 'IDO' | 'LBP' | 'GDA'

export interface Project {
  id: number
  name?: string
  description?: string
  ticker?: string
  logo?: string
  cover?: string
  totalRaise?: number
  tokenPrice: number
  maxAllocation?: number
  currentRoundId: number
  type?: ProjectType
  categories?: string[]
  rounds: Round[]
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
  event?: (account: AccountInterface) => OrganizedEvent
  icon: string
  quest?: string
  reward?: string
  link: string
  isClaimed?: boolean
  type: QuestType
}
