import React from 'react'

import TextInput from 'components/ui/inputs/TextInput'
import Visibility from 'components/ui/buttons/Visibility'
import BaseButton from 'components/ui/buttons/BaseButton'

import Email from 'assets/icons/Envelope.svg?inline'
import Key from 'assets/icons/Key.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import LoginIcon from 'assets/icons/Login.svg?inline'

import PasswordValidator from 'password-validator'
import validateEmail from 'utils/validateEmail'
import produce from 'immer'

import classNames from 'classnames'
import CheckBox from 'components/ui/inputs/CheckBox'

import { useApi } from 'api'
import { useAppDispatch } from 'hooks/hooks'
import AuthActions from 'actions/auth.actions'
import WalletConnectActions from 'actions/walletconnect.actions'
import { useRouter } from 'next/router'

import { GraphQLError } from 'graphql'
import ToastActions from 'actions/toast.actions'
import { ToastPositions, ToastState } from 'components/ui/Toast/utils'
import { ApolloErrors } from 'constants/errors.graphql'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const schema = new PasswordValidator().min(8).max(24).uppercase().symbols()

type FormFields = 'email' | 'password'

export interface Form {
  payload: { email: string; password: string }
  errors: { password: boolean; email: boolean }
  agree: boolean
  visible: boolean
}

const initialForm: Form = {
  payload: { email: '', password: '' },
  errors: { password: false, email: false },
  agree: false,
  visible: false,
}

const AuthForm: React.FC<{
  signUp?: boolean
  address?: string
}> = ({ signUp = false, address }) => {
  if (address) signUp = true

  const [form, setForm] = React.useState<Form>(initialForm)
  const [loading, setLoading] = React.useState(false)
  const { getAccountDetails, login, signup } = useApi()
  const dispatch = useAppDispatch()

  const router = useRouter()

  const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm(
      produce(form, (draft) => {
        draft.payload.email = e.target.value
      })
    )
  }
  const setPassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm(
      produce(form, (draft) => {
        draft.payload.password = e.target.value.replace(' ', '')
        if (!signUp && form.errors.password) {
          draft.errors.password = false
        }
      })
    )
  }

  const onPasswordFocusOut: React.FocusEventHandler<HTMLInputElement> = () => {
    setForm(
      produce(form, (draft) => {
        if (draft.visible) draft.visible = false

        if (signUp) {
          draft.errors.password =
            !!draft.payload.password && !schema.validate(draft.payload.password)
        } else if (draft.errors.password) draft.errors.password = false
      })
    )
  }
  const onEmailFocusOut: React.FocusEventHandler<HTMLInputElement> = () => {
    setForm(
      produce(form, (draft) => {
        draft.errors.email = !!draft.payload.email && !validateEmail(draft.payload.email)
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

  const onAgreeClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setForm(
      produce(form, (draft) => {
        draft.agree = !draft.agree
      })
    )
  }

  const submit = async () => {
    try {
      setLoading(true)
      const token = await (signUp
        ? signup({ ...form.payload, address })
        : login(form.payload)
      ).catch((err) => {
        const error = (err.graphQLErrors as GraphQLError[]).find(
          (_err) => _err.extensions.code === ApolloErrors.FORBIDDEN
        )
        if (error) {
          dispatch(
            ToastActions.addToast({
              title: error.message,
              state: ToastState.ERROR,
              position: ToastPositions.CENTER_LEFT,
              autoClose: true,
            })
          )
          error.extensions.field &&
            setForm(
              produce(form, (draft) => {
                draft.errors[error.extensions.field as FormFields] = true
              })
            )
        }
      })
      // console.warn({ token })
      // const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, false))
      dispatch(AuthActions.fetchStart())
      try {
        const data = await getAccountDetails()
        // console.log('data', data)
        dispatch(AuthActions.fetchSuccess(data))
        router.push('/profile')
      } catch {
        dispatch(AuthActions.fetchFailed())
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const disabled =
    !form.payload.email ||
    !form.payload.password ||
    form.errors.password ||
    form.errors.email ||
    (signUp && !form.agree)

  return (
    <form id={`${signUp ? 'sign-up' : 'login'}-auth-form${address ? '-address' : ''}`}>
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
      <div>
        <TextInput
          icon={<Key />}
          spellCheck={false}
          label="Password"
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
      <div
        className={classNames('flex', 'h-10', 'items-center', 'justify-end', {
          ['my-3']: signUp,
          ['text-red-500']: form.errors.password,
        })}>
        {!signUp ? (
          <a
            onClick={() => router.push('/password-reset')}
            style={{ display: 'block' }}
            className="text-right font-medium cursor-pointer">
            Forgot password?
          </a>
        ) : (
          <p className="text-left font-medium">
            {'Must be 8 characters with at least 1 special & 1 uppercase character.'}
          </p>
        )}
      </div>
      {!!signUp && (
        <div className="my-6 flex items-center">
          <CheckBox id="terms-and-conditions-checkbox" value={form.agree} onClick={onAgreeClick} />
          <p className="mx-6">
            {'I agree with '}
            <a href="/" className="font-bold">
              {'Terms & Conditions'}
            </a>
            {'.'}
          </p>
        </div>
      )}

      <div className="relative mt-4 z-10">
        <BaseButton
          spanProps={{
            className: 'w-full items-center mx-7',
            style: { justifyContent: 'space-between' /* marginTop: '-4px' */ },
          }}
          className=""
          disabled={disabled}
          onClick={submit}>
          <span>
            <LoginIcon className="mr-5" />
            <ButtonTitle title={signUp ? 'Create Account' : 'Login Now'} />
          </span>
          <Chevron className={'icon-right ml-3'} />
        </BaseButton>
      </div>
    </form>
  )
}

export default AuthForm
