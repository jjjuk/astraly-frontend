import React, { Fragment } from 'react'

import Container from 'components/ui/Container'
import { WalletIcon } from 'components/ui/Icons/Icons'

import BaseButton from 'components/ui/buttons/BaseButton'
import Horizontal from 'components/ui/Separator/Horizontal'

import Logo from 'assets/images/logo.svg'
import LogoDark from 'assets/images/logo--dark.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'

import AuthForm from './AuthForm'
import AuthIllustration from './AuthIllustration'

import { useRouter } from 'next/router'
import SocialsAuth from './SocialsAuth'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const Login = () => {
  const router = useRouter()
  const onAlternativeClick = () => {
    router.push('/auth/signup')
  }

  return (
    <Fragment>
      <AuthIllustration />
      <Container>
        <div className="page-title__auth ui-t-dark font-heading uppercase leading-131 text-center lg:text-left">
          Login
        </div>
        <div className="flex row-auto h-14 items-center mb-5 justify-center lg:justify-start">
          <p className="text-24">Welcome back to Astraly!</p>
          <img src={Logo} height="42" width="42" alt="Astraly logo" className="dark:hidden ml-3" />
          <img
            src={LogoDark}
            height="42"
            width="42"
            alt="Astraly logo"
            className="hidden dark:inline-block ml-3"
          />
        </div>

        <div className="block px-8 py-9 max-w-436 mx-auto lg:mx-0">
          <AuthForm />

          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>
          <SocialsAuth />
          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>

          <div className="grid grid-cols-2">
            <div className="flex py-2 text-left self-center">
              <p>
                Don’t have an
                <br />
                account?
              </p>
            </div>
            <div className="flex items-center justify-end">
              <BaseButton
                type="secondary"
                onClick={onAlternativeClick}
                spanProps={{
                  className: 'flex items-center justify-center',
                }}
                className="px-6 w-full">
                <span style={{ whiteSpace: 'nowrap' /* marginTop: -4  */ }}>
                  <WalletIcon className={'mr-3 secondary_button_icon'} />
                  <ButtonTitle title="Sign Up" />
                </span>
              </BaseButton>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default Login
