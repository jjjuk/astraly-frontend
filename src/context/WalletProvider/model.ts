import { BigNumberish } from 'starknet/utils/number'

export type TBalances = {
  [address: string]: {
    raw: BigNumberish
    normalized: string
  }
}

export type TDeposits = {
  [address: string]: {
    raw: BigNumberish
    normalized: string
  }
}

export type TAllowances = {
  [address: string]: {
    raw: BigNumberish
    normalized?: number
  }
}
export type TPrices = {
  [address: string]: {
    raw: BigNumberish
    normalized?: number
  }
}

export type TWalletContext = {
  balances: TBalances
  deposits: TDeposits
  allowances?: TAllowances
  prices?: TPrices
  updateUserData: () => Promise<void>
}

export const WALLET_PROVIDER_INITIAL_STATE: TWalletContext = {
  balances: {},
  deposits: {},
  allowances: {},
  prices: {},
  updateUserData: async (): Promise<void> => undefined,
}
