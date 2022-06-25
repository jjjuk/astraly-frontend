import React from 'react'
import classnames from 'classnames'

import { Text } from '@chakra-ui/react'

import styles from './Pin.module.scss'

interface PinProps extends React.PropsWithChildren<unknown> {
  isVisible: boolean
  style?: React.CSSProperties
}

const Pin: React.FC<PinProps> = ({ isVisible, children, style }) => {
  return (
    <div className={classnames(styles.pin, { [styles['pin--hidden']]: !isVisible })} style={style}>
      <Text fontWeight="700" fontSize="12px">
        {children}
      </Text>
    </div>
  )
}

export default Pin
