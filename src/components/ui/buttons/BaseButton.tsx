import React from 'react'
import classnames from 'classnames'
import styles from './Buttons.module.scss'

const BaseButton = ({
  className,
  children,
  small,
  xSmall,
  medium,
  disabled,
  inline,
  onClick,
  white,
}: React.PropsWithChildren<{
  className?: string
  small?: boolean
  xSmall?: boolean
  medium?: boolean
  disabled?: boolean
  inline?: boolean
  white?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}>) => {
  const classes = classnames('BaseButton', className, styles.baseButton, {
    [styles.baseButtonSmall]: small,
    [styles.baseButtonXSmall]: xSmall,
    [styles.baseButtonDisabled]: disabled,
    [styles.baseButtonInline]: inline,
    [styles.baseButtonWhite]: white,
    [styles.baseButtonMedium]: medium,
  })

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0} onKeyUp={() => {}}>
      <span>{children}</span>
    </div>
  )
}

export default BaseButton
