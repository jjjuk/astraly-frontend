import { QuestType } from '../../../../interfaces'

export const socialQuests = [
  {
    icon: 'twitter',
    quest: 'Follow on Twitter',
    reward: 'Rewards: 2x to win the lottery',
    link: '/',
    isClaimed: false,
  },
  {
    icon: 'twitter',
    quest: 'Write a tweet about ZKLend',
    reward: 'Rewards: 3x to win the lottery',
    link: '/',
    isClaimed: true,
  },
  {
    icon: 'discord',
    quest: 'Enter on Discord',
    reward: 'Rewards: 5x to win the lottery',
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
