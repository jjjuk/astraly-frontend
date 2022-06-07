import { Quest } from '../../../../interfaces'
import BaseModal from '../../../ui/Modal/BaseModal'
import styles from './Modal.module.scss'
import Lightning from '../../../../assets/icons/currentColor/Lightning-alt.svg?inline'
import BaseButton from '../../../ui/buttons/BaseButton'
import { ForwardIcon, LikeIcon } from '../../../ui/Icons/Icons'
import { getIcon } from './utils'
import UrlInput from '../../../ui/inputs/UrlInput'
import { useState } from 'react'
import SandWatch from 'assets/icons/solid/Sand-watch.svg'
import ToastActions from '../../../../actions/toast.actions'
import { useAppDispatch } from '../../../../hooks/hooks'

const QuestModal = ({
  quest,
  isOpen,
  close,
}: {
  quest: Quest | null
  isOpen: boolean
  close: any
}) => {
  const [url, setUrl] = useState('')
  const dispatch = useAppDispatch()

  const approve = () => {
    setUrl('')
    dispatch(
      ToastActions.addToast({
        title: 'Successful quest',
        action: <div className="font-heading text-12 text-primary">View on explorer</div>,
      })
    )
    close()
  }

  if (!quest) {
    return <></>
  }

  return (
    <BaseModal isOpen={isOpen} close={close}>
      <div className={`block ${styles.questModal}`}>
        <div className="block--contrast">
          <div className="title--medium mb-4">Product Quest</div>

          <div className="flex items-center text-primaryDark">
            <div className="text-primaryClear">
              <Lightning />
            </div>
            <ul className={'list-disc ml-8'}>
              <li>
                <strong>Booster Quests</strong> are optional but provide you with a multiplier of
                the number of tickets you can get.
              </li>
              <li>It’s also a great opportunity to learn more about the product by using it.</li>
            </ul>
          </div>
        </div>

        <div className="block__item">
          <div className="grid grid-cols-5 gap-2 mb-10 px-4 ">
            <div
              className={`flex items-center col-span-3 ${
                quest.isClaimed ? 'text-whitePurple' : 'text-primary'
              }`}>
              <div className="icon flex-shrink-0 mr-4">{getIcon(quest)}</div>
              <div>
                <div className="">{quest.quest}</div>

                <div className="flex font-heading">
                  <div className="mr-1 text-primary">
                    <Lightning />
                  </div>
                  {quest.reward}
                </div>
              </div>
            </div>
            <BaseButton className={'col-span-2'}>
              <ForwardIcon className={'mr-1'} />
              Open Link
            </BaseButton>
          </div>
          <UrlInput
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            setValue={(value) => setUrl(value)}
          />
          <div className="h-8"></div>
          <BaseButton
            className={`${!url && 'opacity-50 pointer-events-none'} `}
            onClick={() => approve()}>
            {!url && <img src={SandWatch} alt={''} className={'mr-2'} />}
            {!url && 'Waiting Url'}

            {url && <LikeIcon className={'mr-2'} />}
            {url && 'Approve Quest'}
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  )
}

export default QuestModal
