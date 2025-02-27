import React, { Fragment } from 'react'

import Container from 'components/ui/Container'
import { WalletIcon } from 'components/ui/Icons/Icons'

import BaseButton from 'components/ui/buttons/BaseButton'
import Horizontal from 'components/ui/Separator/Horizontal'

import Logo from 'assets/images/logo.svg'
import LogoDark from 'assets/images/logo--dark.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'
import Twitter from 'assets/icons/outline/Brands/Twitter.svg?inline'
import Google from 'assets/icons/outline/Brands/Google.svg?inline'

import AuthForm from './AuthForm'
import AuthIllustration from './AuthIllustration'

import { useRouter } from 'next/router'

const SignUp = () => {
  const router = useRouter()
  const onAlternativeClick = () => {
    router.push('/auth/login')
  }

  return (
    <Fragment>
      <AuthIllustration />
      <Container>
        <div className="page-title__auth ui-t-dark font-heading uppercase leading-131 text-center lg:text-left">
          Sign Up
        </div>
        <div className="flex row-auto h-14 items-center mb-5 justify-center lg:justify-start">
          <p className="text-24">Welcome to Astraly!</p>
          <img src={Logo} height="42" width="42" alt="Astraly logo" className="dark:hidden ml-3" />
          <img
            src={LogoDark}
            height="42"
            width="42"
            alt="Astraly logo"
            className="hidden dark:inline-block ml-3"
          />
        </div>

        <div className="block bg-whitePurple px-8 py-9 max-w-436 mx-auto lg:mx-0">
          <AuthForm signup />

          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>
          <div className="mt-4">
            <BaseButton
              type="secondary"
              spanProps={{
                className: 'w-full items-center',
                style: { justifyContent: 'space-between' },
              }}
              className="px-7 outlined_button">
              <span className="text-xs text-primaryClear secondary_button_label">
                <Twitter
                  height={24}
                  className="mr-5 secondary_button_icon"
                  style={{ marginTop: '-4px' }}
                />
                Sign up with Twitter
              </span>
              <Chevron className={'icon-right ml-3'} />
            </BaseButton>
          </div>
          <div className="mt-2">
            <BaseButton
              type="secondary"
              spanProps={{
                className: 'w-full items-center',
                style: { justifyContent: 'space-between' },
              }}
              className="px-7 outlined_button">
              <span className="text-xs text-primaryClear secondary_button_label">
                <Google
                  height={24}
                  className="mr-5 secondary_button_icon"
                  style={{ marginTop: '-4px' }}
                />
                Sign up with Google
              </span>
              <Chevron className={'icon-right ml-3'} />
            </BaseButton>
          </div>
          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-center py-2 text-right self-center">
              <p>
                Already have an
                <br />
                account?
              </p>
            </div>
            <div className="flex justify-center py-2 px-2">
              <BaseButton
                type="secondary"
                onClick={onAlternativeClick}
                spanProps={{
                  className: 'items-center',
                  style: { justifyContent: 'space-between' },
                }}
                className="px-7 outlined_button">
                <span
                  style={{ whiteSpace: 'nowrap', marginTop: -4 }}
                  className="text-xs text-primaryClear secondary_button_label">
                  <WalletIcon className={'mr-3 secondary_button_icon'} />
                  Login
                </span>
                <Chevron className={'icon-right ml-3'} />
              </BaseButton>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default SignUp
