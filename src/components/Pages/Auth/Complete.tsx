import React from 'react'

import Container from 'components/ui/Container'

import Logo from 'assets/images/logo.svg'
import LogoDark from 'assets/images/logo--dark.svg'

import AuthForm from './AuthForm'

const Complete: React.FC<{ address: string }> = ({ address }) => {
  return (
    <Container className="mb-12">
      <div className="flex row-auto h-14 items-center mb-5 justify-center">
        <p className="text-24">Complete your account...</p>
        <img src={Logo} height="42" width="42" alt="Astraly logo" className="dark:hidden ml-3" />
        <img
          src={LogoDark}
          height="42"
          width="42"
          alt="Astraly logo"
          className="hidden dark:inline-block ml-3"
        />
      </div>
      <div className="block bg-primaryClearBg px-8 py-9 max-w-436 mx-auto">
        <AuthForm address={address} />
      </div>
    </Container>
  )
}

export default Complete
