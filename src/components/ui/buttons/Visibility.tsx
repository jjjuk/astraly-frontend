import React from 'react'
import VisabilityIcon from 'assets/icons/Visibility.svg?inline'
import VisabilityOffIcon from 'assets/icons/VisibilityOff.svg?inline'
import styles from './Visibility.module.scss'
import classNames from 'classnames'

const Visibility: React.FC<{
  visible: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  className?: string
}> = ({ visible, onClick, className = '' }) => {
  return (
    <div className={classNames(className, styles.visibilityButton)} onClick={onClick}>
      {!visible ? <VisabilityIcon /> : <VisabilityOffIcon />}
    </div>
  )
}

export default Visibility
