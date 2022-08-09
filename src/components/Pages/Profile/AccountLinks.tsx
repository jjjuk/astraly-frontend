import BaseButton from '../../ui/buttons/BaseButton'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { LINK_SOCIAL } from '../../../api/gql/mutations'
import { useAppDispatch } from '../../../hooks/hooks'
import AuthActions from 'actions/auth.actions'
import { FC, useMemo, useState } from 'react'
import BaseInput from '../../ui/inputs/BaseInput'
import TwitterIcon from 'assets/icons/currentColor/Twitter.svg?inline'
import DiscordIcon from 'assets/icons/currentColor/Discord.svg?inline'
import TelegramIcon from 'assets/icons/currentColor/Telegram.svg?inline'
import { useStarknetReact } from '@web3-starknet-react/core'
import { isSameAddress } from '../../../utils'

const AccountLinks: FC<{ user: any }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { account } = useStarknetReact()
  const isSelf = isSameAddress(account?.address, user?.address)

  const [getTwitterAuthUrl] = useLazyQuery(gql`
    query getTwitterAuthUrl {
      getTwitterAuthUrl
    }
  `)

  const [linkSocial] = useMutation(LINK_SOCIAL)

  const linkTwitter = async () => {
    const { data } = await getTwitterAuthUrl()

    router.push(data.getTwitterAuthUrl)
  }

  const SocialLinks = [
    {
      icon: <DiscordIcon width={24} />,
      name: 'Discord',
      link: async (id: string) => {
        const { data } = await linkSocial({
          variables: {
            type: 'DISCORD',
            id,
          },
        })

        dispatch(AuthActions.fetchSuccess(data.linkSocial))
      },
      unlink: async () => {
        const { data } = await linkSocial({
          variables: {
            type: 'DISCORD',
          },
        })

        dispatch(AuthActions.fetchSuccess(data.linkSocial))
      },
      key: 'DISCORD',
    },
    {
      icon: <TelegramIcon />,
      name: 'Telegram',
      link: async (id: string) => {
        const { data } = await linkSocial({
          variables: {
            type: 'TELEGRAM',
            id,
          },
        })

        dispatch(AuthActions.fetchSuccess(data.linkSocial))
      },
      unlink: async () => {
        const { data } = await linkSocial({
          variables: {
            type: 'TELEGRAM',
          },
        })

        dispatch(AuthActions.fetchSuccess(data.linkSocial))
      },
      key: 'TELEGRAM',
    },
    {
      icon: <TwitterIcon width={24} />,
      name: 'Twitter',
      link: linkTwitter,
      unlink: async () => {
        const { data } = await linkSocial({
          variables: {
            type: 'TWITTER',
          },
        })

        dispatch(AuthActions.fetchSuccess(data.linkSocial))
      },
      key: 'TWITTER',
    },
  ]

  const LinkAccount = ({ linkFn, withInput = true }: { linkFn: any; withInput: boolean }) => {
    const [showInput, setShowInput] = useState(false)
    const [id, setId] = useState('')

    const onClick = () => {
      return withInput ? setShowInput(true) : linkFn()
    }
    if (!showInput) {
      return (
        <BaseButton onClick={onClick} xSmall={true} className={'w-[158px]'}>
          Link Account
        </BaseButton>
      )
    }

    return (
      <div className="pl-2 flex items-center">
        <BaseInput type="text" label={''} value={id} onChange={(e) => setId(e.target.value)} />
        <BaseButton className={'ml-2 px-2'} small={true} onClick={() => linkFn(id)}>
          Save
        </BaseButton>
      </div>
    )
  }

  const linked = user?.socialLinks?.map((x: any) => x.type) || []

  const ids = useMemo(
    () =>
      user?.socialLinks?.reduce((acc: any, x: any) => {
        acc[x.type] = x.id
        console.log(acc, x)
        return acc
      }, {}) || {},
    [user]
  )

  return (
    <div className="AccountLinks block">
      <div className="block__item">
        <div className="title--small mb-4">Account links</div>

        {SocialLinks.map((x) => (
          <div className="flex items-center w-full py-4" key={x.name}>
            <div
              className={`icon w-12 flex-shrink-0 ${
                linked.includes(x.key) ? 'text-primary' : 'text-primaryClear'
              }`}>
              {x.icon}
            </div>
            {isSelf && (
              <>
                <div
                  className={`name font-heading text-12 ${
                    linked.includes(x.key) ? 'text-primary' : 'text-primaryClear'
                  }`}>
                  {ids[x.key] || x.name}
                </div>
                <div className="button ml-auto">
                  {!linked.includes(x.key) && (
                    <LinkAccount linkFn={x.link} withInput={x.key !== 'TWITTER'} />
                  )}

                  {linked.includes(x.key) && (
                    <>
                      <div
                        className="font-heading text-12 text-primary cursor-pointer"
                        onClick={x.unlink}>
                        Unlink
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {!isSelf && (
              <div
                className={`name font-heading text-12 ${
                  linked.includes(x.key) ? 'text-primary' : 'text-primaryClear'
                }`}>
                {x.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountLinks
