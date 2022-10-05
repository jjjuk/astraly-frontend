import React from 'react'
import VisibilityIcon from 'assets/icons/solid/Eye.svg?inline'
import VisibilityOffIcon from 'assets/icons/solid/Eye-closed.svg?inline'
import styles from './Visibility.module.scss'
import classNames from 'classnames'

const Visibility: React.FC<{
  visible: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  className?: string
}> = ({ visible, onClick, className = '' }) => {
  return (
    <div className={classNames(className, styles.visibilityButton)} onClick={onClick}>
      {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </div>
  )
}

export default Visibility
