import React, { forwardRef, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import InputGroup from './InputGroup'

const DatePicker = ({ value, onInput }: { value: Date | null; onInput: (date: Date) => void }) => {
  const CustomDatePicker = forwardRef<
    HTMLButtonElement,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  >(({ value, onClick, placeholder }, ref) => (
    <div onClick={onClick} ref={ref}>
      <span className={'font-heading text-12'}>{value || placeholder}</span>
    </div>
  ))

  const inputRef = useRef<ReactDatePicker>(null)

  return (
    <div className="DatePicker">
      <InputGroup
        left={<span>Date</span>}
        onClick={() => {
          inputRef.current?.setOpen(true)
        }}>
        <ReactDatePicker
          ref={inputRef}
          selected={value}
          onChange={onInput}
          placeholderText={'mm/dd/year'}
          customInput={<CustomDatePicker />}
        />
      </InputGroup>
    </div>
  )
}

export default DatePicker
