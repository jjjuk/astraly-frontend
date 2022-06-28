/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import React, { forwardRef, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import InputGroup from './InputGroup'
import { addYears } from 'date-fns'
// import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ value, onInput }: { value: Date | null; onInput: (date: Date) => void }) => {
  const CustomDatePicker = forwardRef<
    HTMLButtonElement,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  >(({ value, onClick, placeholder }, ref) => (
    <button onClick={onClick} ref={ref}>
      <span className={'font-heading text-12'}>{value || placeholder}</span>
    </button>
  ))

  const inputRef = useRef<ReactDatePicker>(null)

  return (
    <div className="DatePicker" style={{ zIndex: 10000 }}>
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
          minDate={new Date()}
          maxDate={addYears(new Date(), 10)}
          showYearDropdown
          customInput={<CustomDatePicker />}
        />
      </InputGroup>
    </div>
  )
}

export default DatePicker
