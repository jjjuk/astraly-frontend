import BaseButton from 'components/ui/buttons/BaseButton'
import Container from 'components/ui/Container'
import Horizontal from 'components/ui/Separator/Horizontal'
import Visibility from 'components/ui/buttons/Visibility'

import { useRouter } from 'next/router'
import React from 'react'
import AuthIllustration from './AuthIllustration'
import { WalletIcon } from 'components/ui/Icons/Icons'
import Link from 'next/link'
import produce from 'immer'
import validateEmail from 'utils/validateEmail'
import TextInput from 'components/ui/inputs/TextInput'

import Email from 'assets/icons/Envelope.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import LoginIcon from 'assets/icons/Login.svg?inline'
import Key from 'assets/icons/Key.svg?inline'

import CheckedIcon from 'assets/icons/outline/Checked-box.svg?inline'

import { useMutation } from '@apollo/client'
import { REQUEST_PASSWORD_RESET, RESET_PASSWORD } from 'api/gql/mutations'
import PasswordValidator from 'password-validator'
import classNames from 'classnames'
import { useAppDispatch } from 'hooks/hooks'
import Spinner from 'components/ui/Spinner/Spinner'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

export interface RequestForm {
  payload: { email: string }
  errors: { email: boolean }
}

const requestInitialForm: RequestForm = {
  payload: { email: '' },
  errors: { email: false },
}

const RequestReset: React.FC = () => {
  const [form, setForm] = React.useState<RequestForm>(requestInitialForm)
  const dispatch = useAppDispatch()

  const [mutate, { loading, called }] = useMutation(REQUEST_PASSWORD_RESET, {
    variables: form.payload,
  })

  const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm(
      produce(form, (draft) => {
        draft.payload.email = e.target.value
      })
    )
  }

  const onEmailFocusOut: React.FocusEventHandler<HTMLInputElement> = () => {
    setForm(
      produce(form, (draft) => {
        draft.errors.email = !!form.payload.email && !validateEmail(draft.payload.email)
      })
    )
  }

  const submit = () => mutate()

  return (
    <React.Fragment>
      <AuthIllustration />
      <Container className="min-h-screen">
        <div className="page-title__auth ui-t-dark font-heading uppercase leading-131 text-center lg:text-left">
          {called && !loading ? 'Check your email' : 'Forgot Password?'}
        </div>
        <div className="flex row-auto h-14 items-center mb-5 justify-center lg:justify-start">
          <p className="text-24">Recover Your password with security.</p>
        </div>

        <div className="block bg-primaryClearBg px-8 py-9 max-w-436 mx-auto lg:mx-0">
          {!called ? (
            <React.Fragment>
              <div className="mb-28px">
                <TextInput
                  icon={<Email />}
                  label="Email"
                  placeholder="satoshi@astraly.xyz"
                  value={form.payload.email}
                  type="email"
                  onChange={setEmail}
                  onBlur={onEmailFocusOut}
                  error={form.errors.email}
                />
              </div>
              <div className="relative z-10 mt-4">
                <BaseButton
                  spanProps={{
                    className: 'w-full items-center',
                    style: { justifyContent: 'space-between' },
                  }}
                  className="px-7"
                  disabled={!form.payload.email || form.errors.email}
                  onClick={submit}>
                  <span
                    style={{ whiteSpace: 'nowrap' /* marginTop: '-4px' */ }}
                    className="text-14">
                    <LoginIcon className="mr-5" />
                    <ButtonTitle title="Send recovery to E-mail" />
                  </span>
                  <Chevron className={'icon-right ml-3'} />
                </BaseButton>
              </div>
            </React.Fragment>
          ) : loading ? (
            <div className="flex items-center">
              <Spinner color="#8F00FF" size="lg" /> <p className="mx-4">Sending...</p>
            </div>
          ) : (
            <div className="flex items-center">
              <CheckedIcon
                width={36}
                height={36}
                style={{ transform: 'scale(1.5)', paddingTop: 6 }}
                className="purple__icon"
              />
              <p className="mx-8">
                Recovery email sent to <b>{form.payload.email}</b>
              </p>
            </div>
          )}

          <div className="flex h-5 items-center my-4">
            <Horizontal />
          </div>

          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center">
              <Link href={'/auth/signup'}>
                <BaseButton
                  type="secondary"
                  spanProps={{
                    className: 'flex items-center justify-center',
                  }}
                  className="px-6 w-full mr-2">
                  <span style={{ whiteSpace: 'nowrap' /* marginTop: -4 */ }}>
                    <WalletIcon className={'mr-3 secondary_button_icon'} />
                    <ButtonTitle title="Sign Up" />
                  </span>
                </BaseButton>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Link href={'/auth/login'}>
                <BaseButton
                  type="secondary"
                  spanProps={{
                    className: 'flex items-center justify-center',
                  }}
                  className="px-6 w-full ml-2">
                  <span style={{ whiteSpace: 'nowrap' /* marginTop: -4 */ }}>
                    <WalletIcon className={'mr-3 secondary_button_icon'} />
                    <ButtonTitle title="Login Now" />
                  </span>
                </BaseButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

export interface ResetForm {
  payload: { password: string }
  errors: { password: boolean }
  visible: boolean
}

const resetInitialForm: ResetForm = {
  payload: { password: '' },
  errors: { password: false },
  visible: false,
}

const schema = new PasswordValidator().min(8).max(24).uppercase().symbols()

const Reset: React.FC<{ token: string }> = ({ token }) => {
  const [form, setForm] = React.useState<ResetForm>(resetInitialForm)

  const router = useRouter()

  const [mutate, { error }] = useMutation(RESET_PASSWORD, {
    variables: { ...form.payload, token },
    onCompleted() {
      router.push('/auth/login')
    },
  })

  const setPassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm(
      produce(form, (draft) => {
        draft.payload.password = e.target.value.replace(' ', '')
      })
    )
  }

  const onPasswordFocusOut: React.FocusEventHandler<HTMLInputElement> = () => {
    form.visible &&
      setForm(
        produce(form, (draft) => {
          draft.visible = false
        })
      )

    setForm(
      produce(form, (draft) => {
        draft.errors.password = !!form.payload.password && !schema.validate(form.payload.password)
      })
    )
  }

  const onVisibilityClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setForm(
      produce(form, (draft) => {
        draft.visible = !draft.visible
      })
    )
  }

  const submit = () => mutate()

  return (
    <React.Fragment>
      <AuthIllustration />
      <Container className="min-h-screen">
        <div className="page-title__auth ui-t-dark font-heading uppercase leading-131 text-center lg:text-left">
          {'Reset Password'}
        </div>
        <div className="flex row-auto h-14 items-center mb-5 justify-center lg:justify-start">
          <p className="text-24">Sometimes we forget things...</p>
        </div>

        <div className="block bg-whitePurple px-8 py-9 max-w-436 mx-auto lg:mx-0">
          {!error ? (
            <React.Fragment>
              <div>
                <TextInput
                  icon={<Key />}
                  spellCheck={false}
                  label="New Password"
                  placeholder="*******************"
                  value={form.payload.password}
                  type={form.visible ? 'text' : 'password'}
                  onChange={setPassword}
                  onBlur={onPasswordFocusOut}
                  error={form.errors.password}
                  adornment={
                    <Visibility
                      className={classNames({ icon_invalid: form.errors.password })}
                      visible={form.visible}
                      onClick={onVisibilityClick}
                    />
                  }
                />
              </div>
              <div className="mt-4 relative z-10">
                <BaseButton
                  spanProps={{
                    className: 'w-full items-center',
                    style: { justifyContent: 'space-between' },
                  }}
                  className="px-7"
                  disabled={!form.payload.password || form.errors.password}
                  onClick={submit}>
                  <span
                    style={{ whiteSpace: 'nowrap' /* marginTop: '-4px' */ }}
                    className="text-14">
                    <LoginIcon className="mr-5" />
                    <ButtonTitle title="Set New Password" />
                  </span>
                  <Chevron className={'icon-right ml-3'} />
                </BaseButton>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-red-500">Invalid token. </p>
              <div className="mt-4 relative z-10">
                <BaseButton
                  spanProps={{
                    className: 'w-full items-center',
                    style: { justifyContent: 'space-between' },
                  }}
                  className="px-7"
                  onClick={() => router.push('/reset-password')}>
                  <span
                    style={{ whiteSpace: 'nowrap' /* marginTop: '-4px' */ }}
                    className="text-14">
                    <LoginIcon className="mr-5" />
                    <ButtonTitle title="Try Again" />
                  </span>
                  <Chevron className={'icon-right ml-3'} />
                </BaseButton>
              </div>
            </React.Fragment>
          )}
        </div>
      </Container>
    </React.Fragment>
  )
}

const PassReset = () => {
  const router = useRouter()

  return typeof router.query?.token === 'string' ? (
    <Reset token={router.query.token} />
  ) : (
    <RequestReset />
  )
}

export default PassReset
