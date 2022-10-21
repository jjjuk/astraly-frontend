import React, { Fragment, useEffect, useState } from 'react'

import { useStarknetReact } from '@web3-starknet-react/core'

import Link from 'next/link'
import { useApi } from 'api'
import { useAppDispatch } from 'hooks/hooks'
import WalletConnectActions from 'actions/walletconnect.actions'
import AuthActions from 'actions/auth.actions'
import HeaderMenu from './menu'
import ProfileButton from './ProfileButton'

import Logo from 'assets/images/logo.svg'
import LogoDark from 'assets/images/logo--dark.svg'
import ThemeSwitcher from '../../components/ui/ThemeSwitcher'
import { useSelector } from 'react-redux'
import BaseButton from 'components/ui/buttons/BaseButton'
import { useRouter } from 'next/router'

import styles from './AppHeader.module.scss'
import classNames from 'classnames'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const Header: React.FC = () => {
  const { /* account, chainId, */ deactivate } = useStarknetReact()
  // const [loading, setLoading] = useState(false)
  // const { getAuthToken, getAccountDetails } = useApi()
  const dispatch = useAppDispatch()

  // @ts-ignore
  const me = useSelector((state) => state.Auth.user)

  const router = useRouter()

  // const login = async () => {
  //   try {
  //     setLoading(true)
  //     const token = await getAuthToken(account?.address)
  //     // console.warn({ token })
  //     // const isModerator = await getIsModerator(account);

  //     dispatch(WalletConnectActions.connectWallet(token, false))
  //     dispatch(AuthActions.fetchStart())
  //     try {
  //       const data = await getAccountDetails()
  //       // console.log('data', data)
  //       dispatch(AuthActions.fetchSuccess(data))
  //     } catch {
  //       dispatch(AuthActions.fetchFailed())
  //     }
  //     setLoading(false)
  //   } catch {
  //     setLoading(false)
  //   }
  // }

  const handleSignOut = () => {
    deactivate()
    dispatch(WalletConnectActions.disconnectWallet())
    dispatch(AuthActions.signOut())
    localStorage.removeItem('token')
    router.push('/')
  }

  // useEffect(() => {
  //   if (account) {
  //     login()
  //   } else {
  //     handleSignOut()
  //   }
  // }, [account, chainId])

  return (
    <div className={classNames(styles.appHeader)}>
      <div className={classNames(styles.appHeader__container, 'g-container')}>
        <Link href="/">
          <div className={classNames(styles.appHeader__logo)}>
            <img src={Logo} height="52" width="52" alt="Astraly logo" className="dark:hidden" />
            <img
              src={LogoDark}
              height="52"
              width="52"
              alt="Astraly logo"
              className="hidden dark:inline-block"
            />
            <div className="text-24 font-bold ml-4 font-heading text-primaryDark hidden md:inline-block uppercase dark:text-whitePurple">
              Astraly
            </div>
          </div>
        </Link>

        <HeaderMenu />

        <div className="flex items-center">
          <ThemeSwitcher />
          <ProfileButton />
          {!me?._id ? (
            <Fragment>
              <BaseButton
                medium
                onClick={() => router.push('/auth/login')}
                className="mx-6"
                type="secondary"
                spanProps={{ className: 'px-4' }}>
                <ButtonTitle title="Login" />
              </BaseButton>
              <BaseButton
                medium
                onClick={() => router.push('/auth/signup')}
                spanProps={{ className: 'px-4' }}
                type="primary">
                <ButtonTitle title="Create Account" />
              </BaseButton>
            </Fragment>
          ) : router.pathname !== '/profile' ? (
            <BaseButton
              medium
              onClick={() => router.push('/profile')}
              className="mx-6"
              spanProps={{ className: 'px-4' }}
              type="secondary">
              <ButtonTitle title="Account" />
            </BaseButton>
          ) : (
            <BaseButton
              medium
              onClick={handleSignOut}
              className="mx-6"
              spanProps={{ className: 'px-4' }}
              type="secondary">
              <ButtonTitle title="Log Out" />
            </BaseButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
