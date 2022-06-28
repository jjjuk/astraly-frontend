const BaseButtonsGroup = ({
  options,
  value,
  onInput,
}: {
  options: { value: string; label: string }[]
  value: string
  onInput: (value: string) => void
}) => {
  return (
    <div className="BaseButtonsGroup flex gap-2">
      {options.map((option) => (
        <div
          onClick={() => onInput(option.value)}
          key={option.value}
          className={`${
            value === option.value ? 'bg-primaryClear text-white' : 'bg-primaryClearBg'
          } rounded-xl px-3 py-1 cursor-pointer`}>
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default BaseButtonsGroup
