import { PropsWithChildren } from 'react'
import styles from './Buttons.module.scss'

const BaseButton = ({
  className,
  children
}: PropsWithChildren<{
  className?: string
}>) => {
  return <div className={`BaseButton ${className} ${styles.baseButton}`}>{children}</div>
}

export default BaseButton
