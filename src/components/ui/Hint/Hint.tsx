import { PropsWithChildren } from 'react'
import Icon from 'assets/icons/Info.svg'
import styles from './Hint.module.scss'

const Hint = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className={styles.hint}>
      <img src={Icon} alt={''} />

      <div className={styles.hintContent}>{children}</div>
    </div>
  )
}

export default Hint
