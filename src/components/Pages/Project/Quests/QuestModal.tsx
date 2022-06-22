import { Quest, QuestType } from '../../../../interfaces'
import BaseModal from '../../../ui/Modal/BaseModal'
import styles from './Modal.module.scss'
import Lightning from '../../../../assets/icons/currentColor/Lightning-alt.svg?inline'
import BaseButton from '../../../ui/buttons/BaseButton'
import { ForwardIcon, LikeIcon } from '../../../ui/Icons/Icons'
import { getIcon } from './utils'
import UrlInput from '../../../ui/inputs/UrlInput'
import { useEffect, useState } from 'react'
import SandWatch from 'assets/icons/solid/Sand-watch.svg'
import ToastActions from '../../../../actions/toast.actions'
import { useAppDispatch } from '../../../../hooks/hooks'
import CloseIcon from 'assets/icons/CrossHex.svg'
import Link from 'next/link'
import { verifyQuest } from 'utils/decode'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import { useApi } from 'api'
import { ToastState } from 'components/ui/Toast/utils'

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
  const { account } = useStarknetReact()
  const dispatch = useAppDispatch()
  // const { authToken } = useSelector((state: RootState) => state.ConnectWallet)
  const { validateQuest } = useApi()

  const approve = async () => {
    if (!quest || !account) return
    if (quest.type === QuestType.PRODUCT) {
      const valid = await verifyQuest(url, quest, account)

      if (valid) {
        validateQuest(String(quest._id))

        dispatch(
          ToastActions.addToast({
            title: 'Successful quest',
            action: (
              <div className="font-heading text-12 text-primary">
                Your chances are now increased
              </div>
            ),
            state: ToastState.VALID,
            autoClose: true,
          })
        )
        close()
      } else {
        dispatch(
          ToastActions.addToast({
            title: 'Transaction hash not valid',
            action: <div className="font-heading text-12 text-primary">Try again</div>,
            state: ToastState.ERROR,
            autoClose: true,
          })
        )
      }
    } else {
      validateQuest(String(quest._id))
      dispatch(
        ToastActions.addToast({
          title: 'Successful quest',
          action: (
            <div className="font-heading text-12 text-primary">Your chances are now increased</div>
          ),
          state: ToastState.VALID,
          autoClose: true,
        })
      )
      close()
    }
  }

  useEffect(() => {
    setUrl('')
  }, [isOpen])

  if (!quest) {
    return <></>
  }

  return (
    <BaseModal isOpen={isOpen} close={close}>
      <div className={`block ${styles.questModal}`}>
        <div
          className="absolute top-4 right-4  hover:shadow-purpleLight rounded-full transition-all hover:transform  hover:scale-110 hover:-translate-y-px rounded-full cursor-pointer"
          onClick={close}>
          <img src={CloseIcon} alt={'close'} />
        </div>
        <div className="block--contrast">
          <div className="title--medium mb-4">
            {quest.type === QuestType.PRODUCT ? 'Product' : 'Social'} Quest
          </div>

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-10 px-4 ">
            <div
              className={`flex items-center md:col-span-3 ${
                quest.isClaimed ? 'text-whitePurple' : 'text-primary'
              }`}>
              <div className="icon flex-shrink-0 mr-4">{getIcon(quest)}</div>
              <div>
                <div className="">{quest.name}</div>

                <div className="flex font-heading">
                  <div className="mr-1 text-primary">
                    <Lightning />
                  </div>
                  {quest.description}
                </div>
              </div>
            </div>
            <a href={quest.link} target="__blank" className={'col-span-2'}>
              <BaseButton>
                <ForwardIcon className={'mr-1'} />
                Open Link
              </BaseButton>
            </a>
          </div>

          {quest.type === QuestType.PRODUCT && (
            <div className="block--contrast py-3 mb-6">
              <div className="titleXs mb-2">Steps</div>

              <ul className="list-decimal base-text ml-4">
                <li>Open the link</li>
                {/* <li>Swap</li> */}
                <li>
                  Paste the hash of transaction on{' '}
                  <a href={'https://voyager.online/'} className="font-bold text-primary">
                    voyager
                  </a>
                </li>
              </ul>
            </div>
          )}
          <UrlInput
            questType={quest.type}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            setValue={(value) => setUrl(value)}
          />
          <div className="h-8"></div>
          <BaseButton
            className={`${!url && 'opacity-50 pointer-events-none'} `}
            onClick={() => approve()}>
            {!url && <img src={SandWatch} alt={''} className={'mr-2'} />}
            {!url && (quest.type === QuestType.PRODUCT ? 'Waiting Hash' : 'Waiting Url')}

            {url && <LikeIcon className={'mr-2'} />}
            {url && 'Approve Quest'}
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  )
}

export default QuestModal
