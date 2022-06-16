import { QuestType } from '../../../../interfaces'

export const socialQuests = [
  {
    icon: 'twitter',
    quest: 'Follow Astraly on Twitter',
    reward: 'Rewards: increase your chances to win the lottery',
    link: '/',
    isClaimed: false,
  },
  {
    icon: 'discord',
    quest: 'Join Astraly Discord',
    reward: 'Rewards: increase your chances to win the lottery',
    link: '/',
    isClaimed: true,
  },
]

export const productQuests = [
  {
    icon: 'swap',
    quest: 'Make a Swap',
    reward: 'Rewards: 3x to win the lottery',
    link: '/',
    isClaimed: false,
    type: QuestType.PRODUCT,
  },
  {
    icon: 'send',
    quest: 'Provide Liquidity',
    reward: 'Rewards: 5x to win the lottery',
    link: '/',
    isClaimed: true,
    type: QuestType.PRODUCT,
  },
]
