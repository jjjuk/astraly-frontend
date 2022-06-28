import { ChangeEventHandler, useRef } from 'react'
import AdminInputGroup from './AdminInputGroup'

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
    <AdminInputGroup left={<span>{label}</span>} onClick={() => input.current?.focus()}>
      <div className="input">
        <input
          ref={input}
          max={max}
          value={value}
          onChange={onChange}
          className={'outline-0 w-[300px] h-22 rounded-md px-3'}
        />
      </div>
    </AdminInputGroup>
  )
}

export default BaseInput
