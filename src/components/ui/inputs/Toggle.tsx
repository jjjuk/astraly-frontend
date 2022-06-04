import style from './Toggle.module.scss'
import { MouseEventHandler } from 'react'
import Unlock from 'assets/icons/outline/Unlock--current.svg?inline'
import Locked from 'assets/icons/solid/Lock.svg'
const Toggle = ({
  value,
  onClick,
}: {
  value: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className={`${style.baseToggle} ${value && style.baseToggleActive}`} onClick={onClick}>
      <div className={style.baseToggleItem}>
        {!value && <Unlock />}
        {value && <img src={Locked} alt="" />}
      </div>
    </div>
  )
}

export default Toggle
