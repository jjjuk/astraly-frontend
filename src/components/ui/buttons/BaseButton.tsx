import React, { HTMLAttributeReferrerPolicy } from 'react'
import classnames from 'classnames'
import styles from './Buttons.module.scss'
import { Auth } from 'reducers/auth.reducers'

const BaseButton: React.FC<
  React.PropsWithChildren<{
    className?: string
    small?: boolean
    xSmall?: boolean
    medium?: boolean
    auth?: boolean
    disabled?: boolean
    inline?: boolean
    white?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
    type?: 'primary' | 'secondary'
    spanProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  }>
> = ({
  className,
  children,
  small,
  xSmall,
  medium,
  auth,
  disabled,
  inline,
  onClick,
  white,
  type = 'primary',
  spanProps,
}) => {
  const classes = classnames(
    'BaseButton',
    styles.baseButton,
    {
      [styles.baseButtonSmall]: small,
      [styles.baseButtonXSmall]: xSmall,
      [styles.baseButtonAuth]: auth,
      [styles.baseButtonDisabled]: disabled,
      [styles.baseButtonInline]: inline,
      [styles.baseButtonWhite]: white,
      [styles.baseButtonMedium]: medium,
    },
    styles[`baseButtonType__${type}`],
    className
  )

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0} onKeyUp={() => {}}>
      <span {...spanProps}>{children}</span>
    </div>
  )
}

export default BaseButton
