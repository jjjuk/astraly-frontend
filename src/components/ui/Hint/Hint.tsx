import { PropsWithChildren, ReactNode } from 'react'
import Icon from 'assets/icons/Info.svg'
import styles from './Hint.module.scss'

const Hint = ({ children, icon }: PropsWithChildren<{ icon?: ReactNode }>) => {
  return (
    <div className={styles.hint}>
      {icon ? icon : <img src={Icon} alt={''} />}

      <div className={styles.hintContent}>{children}</div>
    </div>
  )
}

export default Hint
