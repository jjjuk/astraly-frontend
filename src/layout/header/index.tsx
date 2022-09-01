import React, { useEffect, useState } from 'react'

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

const Header: React.FC = () => {
  const { account, deactivate, chainId } = useStarknetReact()
  const [loading, setLoading] = useState(false)
  const { getAuthToken, getAccountDetails } = useApi()
  const dispatch = useAppDispatch()

  const login = async () => {
    try {
      setLoading(true)
      const token = await getAuthToken(account?.address)
      // console.warn({ token })
      // const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, false))
      dispatch(AuthActions.fetchStart())
      try {
        const data = await getAccountDetails()
        // console.log('data', data)
        dispatch(AuthActions.fetchSuccess(data))
      } catch {
        dispatch(AuthActions.fetchFailed())
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    deactivate()
    dispatch(WalletConnectActions.disconnectWallet())
    dispatch(AuthActions.signOut())
  }

  useEffect(() => {
    if (account) {
      login()
    } else {
      handleSignOut()
    }
  }, [account, chainId])

  return (
    <div className="header">
      <div className="g-container flex justify-between w-full py-22 items-center">
        <Link href="/">
          <div className="logo flex items-center cursor-pointer">
            <img src={Logo} height="80" width="80" alt="Astraly logo" className="dark:hidden" />
            <img
              src={LogoDark}
              height="80"
              width="80"
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
        </div>
      </div>
    </div>
  )
}

export default Header
