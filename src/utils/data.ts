import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Project, Quest, Round } from 'interfaces'
import { bnToUint256, Uint256 } from 'starknet/dist/utils/uint256'

export const rounds: Round[] = [
  {
    title: 'Ticket Claim',
    description: 'You can claim your ticket.',
    startDate: new Date('05/04/2022'),
    endDate: new Date('06/05/2022')
  },
  {
    title: 'Allocation',
    description: 'You can burn your ticket for allocations.',
    startDate: new Date('05/21/2022'),
    endDate: new Date('07/22/2022')
  },
  {
    title: 'Purchase',
    description: 'You can invest in the IDO.',
    startDate: new Date('05/23/2022'),
    endDate: new Date('08/26/2022')
  },
  {
    title: 'Distribution',
    description: 'The tokens are gradually sent to your wallet.',
    startDate: new Date('05/30/2022'),
    endDate: new Date('09/31/2022')
  }
]

export const projects: Project[] = [
  {
    id: 0,
    name: 'ZkSwaap',
    description:
      'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRoundId: 0,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds
  },
  {
    id: 0,
    name: 'ZkSwaap',
    description:
      'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRoundId: 1,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds
  },
  {
    id: 0,
    name: 'ZkSwaap',
    description:
      'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRoundId: 2,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds
  },
  {
    id: 0,
    name: 'ZkSwaap',
    description:
      'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRoundId: 3,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds
  },
  {
    id: 0,
    name: 'ZkSwaap',
    description:
      'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRoundId: 0,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds
  }
]

export const quests: Quest[] = [
  {
    _id: '3289429304',
    idoId: 0,
    name: 'Lock ZKP on ZkPad!',
    description: 'For this quest, you need to lock at least 100 ZKP tokens on ZkPad.',
    event: {
      name: 'Deposit',
      transmitterContract: '0x06d845edc32c8a613861d32a6500be2069cfae861147833eda962a7c89cdd724',
      calldata: [
        {
          name: 'assets',
          type: 'Uint256',
          value: { low: formatUnits('100', 'ether'), high: 0 }
        }
      ]
    }
  }
]
