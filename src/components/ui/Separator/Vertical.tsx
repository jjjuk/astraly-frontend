import Star from 'assets/images/star--current.svg?inline'

import styles from './Separator.module.scss'

const Vertical = () => {
  return (
    <div className={styles.vertical}>
      <div className={styles.verticalLine} />
      <Star />
      <div className={styles.verticalLine} />
    </div>
  )
}

export default Vertical
