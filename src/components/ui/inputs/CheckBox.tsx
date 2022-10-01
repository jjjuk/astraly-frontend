import React from 'react'

import styles from './CheckBox.module.scss'

const CheckBox: React.FC<{
  id: string
  label?: React.ReactNode
  value?: boolean
  onClick: React.MouseEventHandler<HTMLInputElement>
}> = ({ id, value, onClick, label }) => {
  return (
    <div>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        value={value ? 'yes' : 'no'}
        onClick={onClick}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckBox
