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
}: PropsWithChildren<{
  className?: string
  small?: boolean
  xSmall?: boolean
  disabled?: boolean
  inline?: boolean
  onClick?: MouseEventHandler<HTMLDivElement | undefined>
}>) => {
  return (
    <div
      className={`BaseButton ${className} ${styles.baseButton} ${small && styles.baseButtonSmall} ${
        xSmall && styles.baseButtonXSmall
      } ${disabled && styles.baseButtonDisabled} ${inline && styles.baseButtonInline}`}
      onClick={onClick}>
      <span>{children}</span>
    </div>
  )
}

export default BaseButton
