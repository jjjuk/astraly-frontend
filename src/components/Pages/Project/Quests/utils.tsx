import Twitter from 'assets/icons/currentColor/Twitter.svg?inline'
import Discord from 'assets/icons/currentColor/Discord.svg?inline'
import Swap from 'assets/icons/currentColor/Swap.svg?inline'
import Send from 'assets/icons/currentColor/Send.svg?inline'

export const getIcon = (quest: any) => {
  if (quest.icon === 'twitter') {
    return <Twitter />
  }
  if (quest.icon === 'discord') {
    return <Discord />
  }
  if (quest.icon === 'swap') {
    return <Swap />
  }
  if (quest.icon === 'send') {
    return <Send />
  }
}
