import React from 'react'

const BlockLabel: React.FC<{
  label: string
  value: any
  onClick: React.MouseEventHandler<HTMLDivElement>
}> = ({ label, value, onClick }) => {
  return (
    <div className="flex justify-between text-primaryClear mb-1">
      <div className="text-16 mr-3 text-16">{label}</div>
      <div className="flex text-12 items-center">
        <div className="text-12 transform translate-y-px">Available</div>
        <div
          className="font-heading text-primary ml-2 cursor-pointer"
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyUp={() => {}}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default BlockLabel
