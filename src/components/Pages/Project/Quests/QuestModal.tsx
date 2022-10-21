import { Quest, QuestType, SocialLinkType, User } from '../../../../interfaces'
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
import { verifyQuest } from 'utils/decode'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useApi } from 'api'
import { ToastState } from 'components/ui/Toast/utils'
import AuthActions from 'actions/auth.actions'
import Spinner from 'components/ui/Spinner/Spinner'
import { useQuery } from '@apollo/client'
import { USER } from '../../../../api/gql/querries'
import AccountLinks from '../../Profile/AccountLinks'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

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
  const { validateQuest, getAccountDetails } = useApi()
  const [approving, setApproving] = useState(false)

  const { data, refetch } = useQuery(USER, {
    variables: {
      address: account?.address,
    },
    pollInterval: 1000,
  })
  const user: User = data?.getAccount

  const fetchAccountDetails = async () => {
    dispatch(AuthActions.fetchStart())
    try {
      const data = await getAccountDetails()
      dispatch(AuthActions.fetchSuccess(data))
    } catch {
      dispatch(AuthActions.fetchFailed())
    }
  }

  const approve = async () => {
    if (!quest || !account) return
    setApproving(true)
    if (quest.type === QuestType.PRODUCT) {
      const valid = await verifyQuest(url, quest, account)

      if (valid) {
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
        await validateQuest(String(quest._id))
        await fetchAccountDetails()
        setApproving(false)
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
        setApproving(false)
      }
    } else {
      try {
        await validateQuest(String(quest._id))
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
        await fetchAccountDetails()
        close()
      } catch (error) {
        console.error(error)
        dispatch(
          ToastActions.addToast({
            title: 'Error',
            action: (
              <div className="font-heading text-12 text-primary">
                We could not validate the quest
              </div>
            ),
            state: ToastState.ERROR,
            autoClose: true,
          })
        )
      }

      setApproving(false)
    }
  }

  useEffect(() => {
    setUrl('')
  }, [isOpen])

  if (!quest) {
    return <></>
  }

  const isTwitter = quest?.type === QuestType.SOCIAL && quest.icon === 'twitter'
  const isTwitterLinked = user.socialLinks.find((x) => x.type === SocialLinkType.TWITTER)
  const canSubmit = isTwitter ? isTwitterLinked : url

  return (
    <BaseModal isOpen={isOpen} onClose={close}>
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

          <div className="flex items-center ui-t-primaryDark">
            <div className="ui-t-primaryClear">
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
                quest.isClaimed ? 'ui-t-whitePurple' : 'ui-t-primary'
              }`}>
              <div className="icon flex-shrink-0 mr-4">{getIcon(quest)}</div>
              <div>
                <div className="">{quest.name}</div>

                <div className="flex font-heading">
                  <div className="mr-1 ui-t-primary">
                    <Lightning />
                  </div>
                  {quest.description}
                </div>
              </div>
            </div>
            <a href={quest.link} target="__blank" className={'col-span-2'}>
              <BaseButton>
                <ForwardIcon className={'mr-1'} />
                <ButtonTitle title="Open Link" />
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
                  <a href={'https://starkscan.co/'} className="font-bold text-primary">
                    starkscan
                  </a>
                </li>
              </ul>
            </div>
          )}
          {isTwitter && (
            <div className={'flex items-center'}>
              <div className="w-full">
                <AccountLinks user={user} hideTitle={true} showOnly={['Twitter']} />
              </div>

              {!isTwitterLinked && (
                <BaseButton
                  className="px-4 ml-4 flex-shrink-0"
                  xSmall={true}
                  onClick={() => refetch()}>
                  <ButtonTitle title="Refresh info" />
                  <img src={SandWatch} alt={''} className={'mr-2'} />
                </BaseButton>
              )}
            </div>
          )}
          {!isTwitter && (
            <UrlInput
              questType={quest.type}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              setValue={(value) => setUrl(value)}
            />
          )}

          <div className="h-8"></div>
          {!approving ? (
            <BaseButton
              className={`${!canSubmit && 'opacity-50 pointer-events-none'} `}
              onClick={() => approve()}>
              {!canSubmit && <img src={SandWatch} alt={''} className={'mr-2'} />}
              {!canSubmit && (
                <ButtonTitle
                  title={
                    quest.type === QuestType.PRODUCT
                      ? 'Waiting Hash'
                      : isTwitter
                      ? 'Link your account'
                      : 'Waiting Url'
                  }
                />
              )}

              {canSubmit && <LikeIcon className={'mr-2'} />}
              {canSubmit && <ButtonTitle title="Approve Quest" />}
            </BaseButton>
          ) : (
            <BaseButton className={`${'opacity-50 pointer-events-none'} `}>
              <Spinner /> <ButtonTitle title="Approving..." />
            </BaseButton>
          )}
        </div>
      </div>
    </BaseModal>
  )
}

export default QuestModal
