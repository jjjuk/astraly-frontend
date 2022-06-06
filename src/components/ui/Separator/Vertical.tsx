import styles from './Separator.module.scss'
import Star from 'assets/images/star--current.svg?inline'

const Vertical = () => {
  return (
    <div className={styles.vertical}>
      <div className={styles.verticalLine}></div>
      <Star />
      <div className={styles.verticalLine}></div>
    </div>
  )
}

export default Vertical
