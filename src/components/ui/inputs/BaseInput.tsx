import InputGroup from './InputGroup'
import { ChangeEventHandler, useRef } from 'react'

const BaseInput = ({
  label,
  value,
  onChange,
  max,
}: {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  max?: number
}) => {
  const input = useRef<HTMLInputElement | null>(null)
  return (
    <InputGroup left={<span>{label}</span>} onClick={() => input.current?.focus()}>
      <div className="input">
        <input
          ref={input}
          max={max}
          value={value}
          onChange={onChange}
          className={'outline-0 w-full text-right'}
        />
      </div>
    </InputGroup>
  )
}

export default BaseInput
