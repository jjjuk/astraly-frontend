import React, { useRef, useCallback, Fragment } from 'react'

import InputGroup from './InputGroup'

const TextInput: React.FC<{
  icon?: React.ReactNode
  label?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  size?: 'sm' | 'md' | 'xl'
  type?: 'text' | 'password' | 'email' | 'tel'
  placeholder?: string
}> = ({ icon, label, value, onChange, size = 'md', type = 'text', placeholder }) => {
  const input = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    input.current?.focus()
  }, [input.current])

  return (
    <Fragment>
      {!!label && (
        <div className="flex mb-1">
          <div className="ml-3 text-primaryDark dark:text-whitePurple font-bold text-16">
            {label}
          </div>
        </div>
      )}
      <InputGroup alignLabel="right" label={<span>{icon}</span>} onClick={handleClick} size={size}>
        <div className="input">
          <input
            ref={input}
            value={value}
            min={0}
            onChange={onChange}
            className="dark:text-white dark:placeholder-white placeholder-primaryClear text-base font-sans outline-0 w-full text-left invalid:border-red-500 focus:invalid:border-red-500 dark:bg-gray3"
            type={type}
            placeholder={placeholder}
          />
        </div>
      </InputGroup>
    </Fragment>
  )
}

export default TextInput
