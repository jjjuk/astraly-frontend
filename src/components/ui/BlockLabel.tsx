import { MouseEventHandler } from 'react'

const BlockLabel = ({
  label,
  value,
  onClick,
}: {
  label: string
  value: any
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="flex justify-between text-primaryClear mb-1">
      <div className="text-16 mr-4 text-16">{label}</div>
      <div className="flex text-12 items-center">
        <div className="text-12 transform translate-y-px">Available</div>
        <div className="font-heading text-primary ml-2 cursor-pointer" onClick={onClick}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default BlockLabel
