import styles from '../buttons/Buttons.module.scss'
import Outline from 'assets/icons/outline/Filter.svg'
import Solid from 'assets/icons/solid/Filter.svg'

const Filter = () => {
  return (
    <div className={`${styles.baseButton} ${styles.baseButtonMedium} w-12`}>
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
