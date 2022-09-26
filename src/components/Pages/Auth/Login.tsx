import React, { Fragment } from 'react'

import Container from 'components/ui/Container'
import TextInput from 'components/ui/inputs/TextInput'
import BaseButton from 'components/ui/buttons/BaseButton'
import Horizontal from 'components/ui/Separator/Horizontal'

import Email from 'assets/icons/Envelope.svg?inline'
import Key from 'assets/icons/Key.svg?inline'
import Logo from 'assets/images/logo.svg'
import LogoDark from 'assets/images/logo--dark.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'
import LoginIcon from 'assets/icons/Login.svg?inline'
import Twitter from 'assets/icons/outline/Brands/Twitter.svg?inline'

import Illustration from 'assets/images/illustration-auth.svg?inline'

import Coin from 'assets/animations/auth-coin.gif'

type Form = { email: string; password: string }

const initialForm: Form = { email: '', password: '' }

const Login = () => {
  const [form, setForm] = React.useState<Form>(initialForm)

  const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((form) => ({ ...form, email: e.target.value }))
  }
  const setPassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((form) => ({ ...form, password: e.target.value }))
  }
  return (
    <Fragment>
      <div className="ui-page-block auth">
        <Illustration style={{ position: 'absolute', marginTop: '-60px', right: '0px' }} />
        <img
          src={Coin.src}
          alt="Coin"
          style={{ position: 'absolute', marginTop: '-42px', right: '382px', height: '472px' }}
        />
      </div>
      <Container>
        <div className="page-title__auth ui-t-dark font-heading uppercase leading-131">Login</div>
        <div className="flex row-auto h-14 items-center mb-5">
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

        <div className="block bg-whitePurple px-8 py-9 max-w-436">
          <div className="mb-28px">
            <TextInput
              icon={<Email />}
              label="Email"
              placeholder="satoshi@astraly.xyz"
              value={form.email}
              type="email"
              onChange={setEmail}
            />
          </div>
          <div>
            <TextInput
              icon={<Key />}
              label="Password"
              placeholder="***************************"
              value={form.password}
              type="password"
              onChange={setPassword}
            />
          </div>
          <div className="flex h-10 items-center">
            <a href="/" style={{ display: 'block' }} className="text-right font-medium w-full">
              Forgot password?
            </a>
          </div>
          <div className="mt-4">
            <BaseButton
              spanProps={{
                className: 'w-full items-center',
                style: { justifyContent: 'space-between' },
              }}
              className="px-7">
              <span>
                <LoginIcon className="mr-5" style={{ marginTop: '-4px' }} />
                Login Now
              </span>
              <Chevron className={'icon-right ml-3'} />
            </BaseButton>
          </div>
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
              className="px-7">
              <span className="text-xs text-primaryClear">
                <Twitter height={24} className="mr-5" style={{ marginTop: '-4px' }} />
                Sign in with Twitter
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
              className="px-7">
              <span className="text-xs text-primaryClear">
                <Twitter height={24} className="mr-5" style={{ marginTop: '-4px' }} />
                Sign in with Google
              </span>
              <Chevron className={'icon-right ml-3'} />
            </BaseButton>
          </div>
          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default Login
