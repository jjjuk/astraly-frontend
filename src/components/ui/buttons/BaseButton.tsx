import { MouseEventHandler, PropsWithChildren } from 'react'
import styles from './Buttons.module.scss'

const BaseButton = ({
  className,
  children,
  small,
  xSmall,
  disabled,
  inline,
  onClick,
  white,
}: PropsWithChildren<{
  className?: string
  small?: boolean
  xSmall?: boolean
  disabled?: boolean
  inline?: boolean
  white?: boolean
  onClick?: MouseEventHandler<HTMLDivElement | undefined>
}>) => {
  const classes = Object.values({
    small: small ? styles.baseButtonSmall : undefined,
    xSmall: xSmall ? styles.baseButtonXSmall : undefined,
    disabled: disabled ? styles.baseButtonDisabled : undefined,
    inline: inline ? styles.baseButtonInline : undefined,
    white: white ? styles.baseButtonWhite : undefined,
  })
    .filter((x) => x)
    .join(' ')

  return (
    <div className={`BaseButton ${className} ${styles.baseButton} ${classes}`} onClick={onClick}>
      <span>{children}</span>
    </div>
  )
}

export default BaseButton
