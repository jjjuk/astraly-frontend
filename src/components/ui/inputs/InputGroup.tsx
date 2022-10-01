import React from 'react'
import classnames from 'classnames'

const InputGroup: React.FC<
  React.PropsWithChildren<{
    label: React.ReactNode
    adornment?: React.ReactNode
    onClick: React.MouseEventHandler<HTMLDivElement>
    size?: 'sm' | 'md' | 'xl'
    alignLabel?: 'left' | 'right' | 'center'
    error?: boolean
  }>
> = ({ children, label, adornment, onClick, size, alignLabel = 'left', error = false }) => {
  return (
    <div
      className={classnames(
        'InputGroup',
        'bg-white dark:bg-gray3',
        'border',
        ' ',
        'flex',
        'items-center',
        'px-4',
        { 'h-8': size === 'sm' },
        { 'h-12': size === 'md' },
        { 'h-14': size === 'xl' },
        'justify-between',
        'font-heading',
        'text-12',
        'rounded-md',
        'cursor-pointer',
        {
          ['text-primaryClear']: !error,
          ['dark:text-white']: !error,
          ['focus-within:text-primary']: !error,
          ['focus-within:border-primary']: !error,
          ['border-whitePurple']: !error,
          ['dark:border-primary']: !error,
          ['border-red-500']: error,
          ['text-red-500']: error,
        }
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}>
      <div className={classnames(alignLabel, 'whitespace-nowrap', 'mr-2')}>{label}</div>
      <div className="input w-full">{children}</div>
      {!!adornment && <div className="ml-2">{adornment}</div>}
    </div>
  )
}

export default InputGroup
