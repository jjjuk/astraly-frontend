import React from 'react'
import classnames from 'classnames'

const InputGroup: React.FC<
  React.PropsWithChildren<{
    label: React.ReactNode
    onClick: React.MouseEventHandler<HTMLDivElement>
    size?: 'sm' | 'md' | 'xl'
    alignLabel?: 'left' | 'right' | 'center'
  }>
> = ({ children, label, onClick, size, alignLabel = 'left' }) => {
  return (
    <div
      className={classnames(
        'InputGroup',
        'bg-white dark:bg-gray3',
        'border',
        'border-whitePurple dark:border-primary',
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
        'text-primaryClear dark:text-white',
        'focus-within:text-primary',
        'focus-within:border-primary',
        'cursor-pointer'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}>
      <div className={classnames(alignLabel, 'whitespace-nowrap', 'mr-2')}>{label}</div>
      <div className="input w-full">{children}</div>
    </div>
  )
}

export default InputGroup
