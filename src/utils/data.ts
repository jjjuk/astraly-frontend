import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Project, Quest, QuestType, Round } from 'interfaces'
import { AccountInterface } from 'starknet'
import { bnToUint256, Uint256 } from 'starknet/dist/utils/uint256'

export const rounds: Round[] = [
  {
    title: 'Ticket Claim',
    description: 'You can claim your ticket.',
    startDate: new Date(1655740800 * 1000),
    endDate: new Date(1655913600 * 1000),
  },
  {
    title: 'Allocation',
    description: 'You can burn your ticket for allocations.',
    startDate: new Date(1656086400 * 1000),
    endDate: new Date(1656259200 * 1000),
  },
  {
    title: 'Purchase',
    description: 'You can invest in the IDO.',
    startDate: new Date(1656259200 * 1000),
    endDate: new Date(1656359200 * 1000),
  },
  {
    title: 'Distribution',
    description: 'The tokens are gradually sent to your wallet.',
    startDate: new Date(1656345600 * 1000),
    endDate: new Date(1656864000 * 1000),
  },
]

export const projects: Project[] = [
  {
    id: 3,
    name: 'Demo Project',
    description:
      'This project is a placeholder. Once Astraly is live on mainnet, you’ll be able to discover and invest in real projects building on StarkNet.',
    ticker: 'ASTR',
    logo: 'https://testnet.astraly.xyz/images/logo_black_bg.png',
    cover: 'https://testnet.astraly.xyz/images/home/builders.png',
    totalRaise: 1000,
    tokenPrice: 0.1,
    maxAllocation: 500,
    currentRoundId: 0,
    type: 'IDO',
    categories: ['DeFi', 'DEX'],
    rounds,
  },
  // {
  //   id: 1,
  //   name: 'ZkSwaap2',
  //   description:
  //     'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
  //   ticker: 'ZKS',
  //   logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //   cover:
  //     'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  //   totalRaise: 1500000,
  //   maxAllocation: 500,
  //   currentRoundId: 1,
  //   type: 'IDO',
  //   categories: ['DeFi', 'DEX'],
  //   rounds,
  // },
  // {
  //   id: 3,
  //   name: 'ZkSwaap4',
  //   description:
  //     'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
  //   ticker: 'ZKS',
  //   logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //   cover:
  //     'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  //   totalRaise: 1500000,
  //   maxAllocation: 500,
  //   currentRoundId: 2,
  //   type: 'IDO',
  //   categories: ['DeFi', 'DEX'],
  //   rounds,
  // },
  // {
  //   id: 4,
  //   name: 'ZkSwaap',
  //   description:
  //     'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
  //   ticker: 'ZKS',
  //   logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //   cover:
  //     'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  //   totalRaise: 1500000,
  //   maxAllocation: 500,
  //   currentRoundId: 3,
  //   type: 'IDO',
  //   categories: ['DeFi', 'DEX'],
  //   rounds,
  // },
  // {
  //   id: 5,
  //   name: 'ZkSwaap',
  //   description:
  //     'SithSwap is a next‐gen AMM on Starknet featuring instant volatile and stable swaps with ultra‐low slippage, zero fees and the full security of Ethereum.',
  //   ticker: 'ZKS',
  //   logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //   cover:
  //     'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  //   totalRaise: 1500000,
  //   maxAllocation: 500,
  //   currentRoundId: 0,
  //   type: 'IDO',
  //   categories: ['DeFi', 'DEX'],
  //   rounds,
  // },
]

export const quests: Quest[] = [
  {
    _id: '3289429304',
    idoId: 3,
    name: 'Claim your ASTR!',
    description: 'For this quest, you need to claim 100 ASTR tokens using the Astraly faucet.',
    icon: 'swap',
    link: '/buy',
    type: QuestType.PRODUCT,
    event: (account: AccountInterface) => {
      return {
        name: 'Transfer',
        transmitterContract: '0x05a6b68181bb48501a7a447a3f99936827e41d77114728960f22892f02e24928',
        calldata: [
          {
            name: 'from_',
            type: 'felt',
            value: '0x02810b322f1709382244cebec85e47098d2b913e910ae5d3650aaa46ba6526fe',
          },
          {
            name: 'to',
            type: 'felt',
            value: account.address,
          },
          {
            name: 'value',
            type: 'Uint256',
            value: { low: formatUnits('100', 'ether'), high: 0 },
          },
        ],
      }
    },
  },
  {
    _id: '3289429304',
    idoId: 0,
    name: 'Lock your ASTR!',
    description: 'For this quest, you need to lock at least 100 ASTR tokens on Astraly.',
    icon: 'swap',
    link: '/stake',
    type: QuestType.PRODUCT,
    event: (account?: AccountInterface) => {
      return {
        name: 'Deposit',
        transmitterContract: '0x005ef67d8c38b82ba699f206bf0db59f1828087a710bad48cc4d51a2b0da4c29',
        calldata: [
          {
            name: 'assets',
            type: 'Uint256',
            value: { low: formatUnits('100', 'ether'), high: 0 },
          },
        ],
      }
    },
  },
]
