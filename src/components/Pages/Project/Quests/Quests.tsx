import { productQuests, socialQuests } from './quests.mock'
import BaseButton from 'components/ui/buttons/BaseButton'
import Lightning from 'assets/icons/currentColor/Lightning-alt.svg?inline'
import { ForwardIcon } from 'components/ui/Icons/Icons'
import QuestModal from './QuestModal'
import { useEffect, useState } from 'react'
import { Quest } from 'interfaces'
import { getIcon } from './utils'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'

const QuestBlocks = ({
  quests,
  title,
  showQuest,
}: {
  quests: Quest[]
  title: string
  showQuest: any
}) => {
  const { user } = useSelector((state: RootState) => state.Auth)

  useEffect(() => console.log('u', user), [user])

  return (
    <div className="block mb-4">
      <div className="hidden lg:block bg-line bg-line--quests"></div>
      <div className="block--contrast">
        <div className="title--medium">{title}</div>
      </div>
      <div className="block__item">
        {quests.map((quest, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10" key={index}>
            <div
              className={`flex items-center ${
                user?.questCompleted?.find((q: any) => q._id === quest._id)
                  ? 'text-whitePurple'
                  : 'text-primary'
              }`}>
              <div className="icon flex-shrink-0 mr-4">{getIcon(quest)}</div>
              <div>
                <div className="">{quest.name}</div>

                <div className="flex font-heading">
                  <div className="mr-1">
                    <Lightning />
                  </div>
                  {quest.description}
                </div>
              </div>
            </div>
            <BaseButton
              className={`${
                user?.questCompleted?.find((q: any) => q._id === quest._id) &&
                'opacity-50 pointer-events-none'
              } `}
              onClick={() => showQuest(quest)}>
              {user?.questCompleted?.find((q: any) => q._id === quest._id) ? (
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
