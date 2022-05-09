import {Project, Round} from 'interfaces';

export const rounds: Round[] = [
  {
    title: 'Ticket Claim',
    description: 'You can claim your ticket.',
    startDate: new Date('05/04/2022'),
    endDate: new Date('05/20/2022')
  },
  {
    title: 'Allocation',
    description: 'You can burn your ticket for allocations.',
    startDate: new Date('05/21/2022'),
    endDate: new Date('05/22/2022')
  },
  {
    title: 'Purchase',
    description: 'You can invest in the IDO.',
    startDate: new Date('05/23/2022'),
    endDate: new Date('05/26/2022')
  },
  {
    title: 'Distribution',
    description: 'The tokens are gradually sent to your wallet.',
    startDate: new Date('05/30/2022'),
    endDate: new Date('05/31/2022')
  }
];

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
  }
];
