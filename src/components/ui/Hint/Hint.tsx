import React from 'react'

import Icon from 'assets/icons/Info.svg'

import styles from './Hint.module.scss'

const Hint: React.FC<
  React.PropsWithChildren<{
    icon?: React.ReactNode
  }>
> = ({ children, icon }) => {
  return (
    <div className={styles.hint}>
      {icon ? icon : <img src={Icon} alt="" />}

      <div className={styles.hintContent}>{children}</div>
    </div>
  )
}

export default Hint
