import React from 'react'
import classnames from 'classnames'

const InputGroup: React.FC<
  React.PropsWithChildren<{
    left: React.ReactNode
    onClick: React.MouseEventHandler<HTMLDivElement>
    size?: 'md' | 'xl'
  }>
> = ({ children, left, onClick, size }) => {
  return (
    <div
      className={classnames(
        'InputGroup',
        'bg-white',
        'border',
        'border-whitePurple',
        'flex',
        'items-center',
        'px-4',
        { 'h-12': size === 'md' },
        { 'h-14': size === 'xl' },
        'justify-between',
        'font-heading',
        'text-12',
        'rounded-md',
        'text-primaryClear',
        'focus-within:text-primary',
        'focus-within:border-primary',
        'cursor-pointer'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}>
      <div className="left whitespace-nowrap">{left}</div>
      <div className="input">{children}</div>
    </div>
  )
}

export default InputGroup
