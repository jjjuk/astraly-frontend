import React, { useRef, useCallback } from 'react'

import InputGroup from './InputGroup'

const BaseInput: React.FC<{
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}> = ({ label, value, onChange, max }) => {
  const input = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    input.current?.focus()
  }, [input.current])

  return (
    <InputGroup left={<span>{label}</span>} onClick={handleClick}>
      <div className="input">
        <input
          ref={input}
          max={max}
          value={value}
          onChange={onChange}
          className="outline-0 w-full text-right"
        />
      </div>
    </InputGroup>
  )
}

export default BaseInput
