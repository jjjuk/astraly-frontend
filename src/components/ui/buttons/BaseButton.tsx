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
    disabled?: boolean
    inline?: boolean
    white?: boolean
    borderless?: boolean
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
  disabled,
  inline,
  onClick,
  white,
  type = 'primary',
  spanProps,
  borderless,
}) => {
  const classes = classnames(
    'BaseButton',
    styles.baseButton,
    className,
    {
      [styles.baseButtonSmall]: small,
      [styles.baseButtonXSmall]: xSmall,
      // [styles.baseButtonAuth]: auth,
      [styles.baseButtonDisabled]: disabled,
      [styles.baseButtonInline]: inline,
      [styles.baseButtonWhite]: white,
      [styles.baseButtonMedium]: medium,
      [styles.borderless]: borderless,
    },
    styles[`baseButtonType__${type}`]
  )

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0} onKeyUp={() => {}}>
      <div className={styles.frame} />
      <span {...spanProps}>{children}</span>
    </div>
  )
}

export default BaseButton
