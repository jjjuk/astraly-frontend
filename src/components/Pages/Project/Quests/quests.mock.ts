import { parseUnits } from 'ethers/lib/utils'
import { AccountInterface } from 'starknet'
import { Quest, QuestType } from '../../../../interfaces'

export const socialQuests: Quest[] = [
  {
    idoId: 3,
    _id: '62b0d1587b8d23057e2e1440',
    icon: 'twitter',
    name: 'Follow Astraly on Twitter',
    description: 'Rewards: increase your chances to win the lottery',
    link: 'https://twitter.com/AstralyXYZ',
    isClaimed: false,
    type: QuestType.SOCIAL,
  },
  {
    idoId: 3,
    _id: '62b0d1687b8d23057e2e1441',
    icon: 'discord',
    name: 'Join Astraly Discord',
    description: 'Rewards: increase your chances to win the lottery',
    link: 'https://discord.gg/astralyxyz',
    isClaimed: false,
    type: QuestType.SOCIAL,
  },
]

export const productQuests: Quest[] = [
  {
    _id: '62b0d0d97b8d23057e2e143e',
    idoId: 3,
    name: 'Claim your ASTR!',
    description: 'Claim 100 ASTR tokens using the Astraly faucet.',
    icon: 'send',
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
            value: { low: parseUnits('100.0', 'ether').toString(), high: 0 },
          },
        ],
      }
    },
  },
  {
    _id: '62b0d14b7b8d23057e2e143f',
    idoId: 3,
    name: 'Lock your ASTR!',
    description: 'Lock at least 100 ASTR tokens on Astraly.',
    icon: 'lock',
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
            value: { low: parseUnits('100.0', 'ether').toString(), high: 0 },
          },
        ],
      }
    },
  },
]
