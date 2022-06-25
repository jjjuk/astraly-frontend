import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Project, Quest, QuestType, Round } from 'interfaces'
import { AccountInterface } from 'starknet'
import { bnToUint256, Uint256 } from 'starknet/dist/utils/uint256'

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
