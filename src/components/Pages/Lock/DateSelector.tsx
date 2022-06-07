/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction, useState } from 'react'
import DatePicker from '../../ui/inputs/DatePicker'

const DateSelector = ({
  startDate,
  setStartDate,
}: {
  startDate: Date | null
  setStartDate: Dispatch<SetStateAction<Date | null>>
}) => {
  const setRoundDate = (months: number) => {
    const d = new Date()
    d.setMonth(d.getMonth() + months)
    setStartDate(d)
  }
  const options = [
    ['6 Months', 6],
    ['1 Year', 12],
    ['3 Years', 12 * 3],
  ]

  return (
    <div className="DateSelector">
      <div className="label text-primaryClear">Lock until</div>

      <div className="flex gap-5">
        <div className="labels grid-cols-3 grid gap-3 items-center shrink-0">
          {options.map(([label, value]) => (
            <div
              className="bg-primary rounded-md text-white flex items-center justify-center px-3 pt-1 pb-0.5 text-12 font-bold cursor-pointer"
              onClick={() => setRoundDate(value as number)}
              key={value}>
              {label}
            </div>
          ))}
        </div>
        <div className="date w-full">
          <DatePicker value={startDate} onInput={(date: Date) => setStartDate(date)} />
        </div>
      </div>
    </div>
  )
}

export default DateSelector
