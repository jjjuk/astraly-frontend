import styles from '../buttons/Buttons.module.scss'
import Outline from 'assets/icons/outline/Filter.svg'
import Solid from 'assets/icons/solid/Filter.svg'

const Filter = () => {
  return (
    <div className={`${styles.baseButton} w-14`}>
      <img
        src={Outline}
        alt={''}
        className={`${styles.baseButtonIcon} ${styles.baseButtonIconOutline}`}
      />
      <img
        src={Solid}
        alt={''}
        className={`${styles.baseButtonIcon} ${styles.baseButtonIconSolid}`}
      />
    </div>
  )
}

export default Filter
