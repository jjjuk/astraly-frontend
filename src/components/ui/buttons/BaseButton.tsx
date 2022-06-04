import { PropsWithChildren } from 'react'
import styles from './Buttons.module.scss'

const BaseButton = ({
  className,
  children,
  small,
  disabled,
  inline,
}: PropsWithChildren<{
  className?: string
  small?: boolean
  disabled?: boolean
  inline?: boolean
}>) => {
  return (
    <div
      className={`BaseButton ${className} ${styles.baseButton} ${small && styles.baseButtonSmall} ${
        disabled && styles.baseButtonDisabled
      } ${inline && styles.baseButtonInline}`}>
      {children}
    </div>
  )
}

export default BaseButton
