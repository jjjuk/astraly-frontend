import classNames from 'classnames'
import React, { useRef, useCallback, Fragment, useEffect } from 'react'

import InputGroup from './InputGroup'

const TextInput: React.FC<{
  icon?: React.ReactNode
  adornment?: React.ReactNode
  label?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  size?: 'sm' | 'md' | 'xl'
  type?: 'text' | 'password' | 'email' | 'tel'
  error?: boolean
  placeholder?: string
  spellCheck?: boolean
}> = ({
  icon,
  label,
  value,
  onChange,
  onBlur,
  size = 'md',
  type = 'text',
  placeholder,
  adornment,
  spellCheck = true,
  error = false,
}) => {
  const input = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    input.current?.focus()
  }, [input.current])

  useEffect(() => {
    input.current?.setCustomValidity(error ? 'Invalid field.' : '')
  }, [input.current, error])

  return (
    <Fragment>
      {!!label && (
        <div className={classNames('flex', 'mb-1')}>
          <div
            className={classNames('ml-3', 'font-bold', 'text-16', {
              ['text-red-500']: error,
              ['text-primaryDark']: !error,
              ['dark:text-whitePurple']: !error,
            })}>
            {label}
          </div>
        </div>
      )}
      <InputGroup
        alignLabel="right"
        label={<span className={classNames({ icon_invalid: error })}>{icon}</span>}
        adornment={adornment}
        onClick={handleClick}
        error={error}
        size={size}>
        <div className="input">
          <input
            ref={input}
            value={value}
            spellCheck={spellCheck}
            onChange={onChange}
            onBlur={onBlur}
            className={classNames(
              'dark:placeholder-white',
              'placeholder-primaryClear',
              'text-base',
              'font-sans',
              'outline-0',
              'w-full',
              'text-left',
              'invalid:border-red-500',
              'focus:invalid:border-red-500',
              'dark:bg-gray3',
              { ['invalid_input']: error, ['dark:text-white']: !error }
            )}
            type={type}
            placeholder={placeholder}
          />
        </div>
      </InputGroup>
    </Fragment>
  )
}

export default TextInput
