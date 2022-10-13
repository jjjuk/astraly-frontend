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

const schema = new PasswordValidator().min(8).max(24).uppercase().symbols()

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
    signUp &&
      setForm(
        produce(form, (draft) => {
          draft.errors.password = !!form.payload.password && !schema.validate(form.payload.password)
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
      const token = await (signUp ? signup({ ...form.payload, address }) : login(form.payload))
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
          <a href="/" style={{ display: 'block' }} className="text-right font-medium">
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
      <div className="mt-4">
        <BaseButton
          spanProps={{
            className: 'w-full items-center',
            style: { justifyContent: 'space-between', marginTop: '-4px' },
          }}
          className="px-7"
          auth
          disabled={disabled}
          onClick={submit}>
          <span>
            <LoginIcon className="mr-5" />
            {signUp ? 'Create Account' : 'Login Now'}
          </span>
          <Chevron className={'icon-right ml-3'} />
        </BaseButton>
      </div>
    </React.Fragment>
  )
}

export default AuthForm
