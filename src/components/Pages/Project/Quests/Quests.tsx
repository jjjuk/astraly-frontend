import { productQuests, socialQuests } from './quests.mock'
import BaseButton from '../../../ui/buttons/BaseButton'
import Twitter from 'assets/icons/currentColor/Twitter.svg?inline'
import Discord from 'assets/icons/currentColor/Discord.svg?inline'
import Swap from 'assets/icons/currentColor/Swap.svg?inline'
import Send from 'assets/icons/currentColor/Send.svg?inline'
import Lightning from 'assets/icons/currentColor/Lightning-alt.svg?inline'

const getIcon = (quest: any) => {
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
const QuestBlocks = ({ quests, title }: { quests: typeof socialQuests; title: string }) => {
  return (
    <div className="block mb-4">
      <div className="block--contrast">
        <div className="title--medium">{title}</div>
      </div>

      <div className="block__item">
        {quests.map((quest, index) => (
          <div className="grid grid-cols-2 gap-10 mb-10">
            <div
              className={`flex items-center ${
                quest.isClaimed ? 'text-whitePurple' : 'text-primary'
              }`}>
              <div className="icon flex-shrink-0 mr-4">{getIcon(quest)}</div>
              <div>
                <div className="">{quest.quest}</div>

                <div className="flex font-heading">
                  <div className="mr-1">
                    <Lightning />
                  </div>
                  {quest.reward}
                </div>
              </div>
            </div>
            <BaseButton>Go to Quest</BaseButton>
          </div>
        ))}
      </div>
    </div>
  )
}

const Quests = () => {
  return (
    <div className="Quests">
      <QuestBlocks quests={socialQuests} title={'Social Quests'} />
      <QuestBlocks quests={productQuests} title={'Product Quests'} />
    </div>
  )
}

export default Quests
