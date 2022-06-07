import { productQuests, socialQuests } from './quests.mock'
import BaseButton from '../../../ui/buttons/BaseButton'
import Twitter from 'assets/icons/currentColor/Twitter.svg?inline'
import Discord from 'assets/icons/currentColor/Discord.svg?inline'
import Swap from 'assets/icons/currentColor/Swap.svg?inline'
import Send from 'assets/icons/currentColor/Send.svg?inline'
import Lightning from 'assets/icons/currentColor/Lightning-alt.svg?inline'
import { ForwardIcon } from '../../../ui/Icons/Icons'
import QuestModal from './QuestModal'
import { useState } from 'react'
import { Quest } from '../../../../interfaces'
import { getIcon } from './utils'

const QuestBlocks = ({
  quests,
  title,
  showQuest,
}: {
  quests: typeof socialQuests
  title: string
  showQuest: any
}) => {
  return (
    <div className="block mb-4">
      <div className="block--contrast">
        <div className="title--medium">{title}</div>
      </div>

      <div className="block__item">
        {quests.map((quest, index) => (
          <div className="grid grid-cols-2 gap-10 mb-10" key={index}>
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
            <BaseButton
              className={`${quest.isClaimed && 'opacity-50 pointer-events-none'} `}
              onClick={() => showQuest(quest)}>
              {quest.isClaimed ? (
                'Claimed'
              ) : (
                <>
                  <ForwardIcon className={'mr-1'} />
                  Go to Quest
                </>
              )}
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  )
}

const Quests = () => {
  const [doShowModal, setDoShowModal] = useState(true)
  const [quest, setQuest] = useState<Quest | null>(null)
  const showQuest = (quest: Quest) => {
    setDoShowModal(true)
    setQuest(quest)
  }
  return (
    <div className="Quests">
      <QuestModal quest={quest} isOpen={doShowModal} close={() => setDoShowModal(false)} />
      <QuestBlocks quests={socialQuests} title={'Social Quests'} showQuest={showQuest} />
      <QuestBlocks quests={productQuests} title={'Product Quests'} showQuest={showQuest} />
    </div>
  )
}

export default Quests
