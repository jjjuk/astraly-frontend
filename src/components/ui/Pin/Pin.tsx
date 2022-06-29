import React from 'react'
import classnames from 'classnames'

import styles from './Pin.module.scss'

interface PinProps extends React.PropsWithChildren<unknown> {
  isVisible: boolean
  style?: React.CSSProperties
}

const Pin: React.FC<PinProps> = ({ isVisible, children, style }) => {
  return (
    <div
      className={classnames(
        styles.pin,
        { [styles['pin--hidden']]: !isVisible },
        'text-xs',
        'font-bold'
      )}
      style={style}>
      {children}
    </div>
  )
}

export default Pin
