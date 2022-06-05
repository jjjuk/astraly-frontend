import { ToastNotification } from './utils'
import { useState } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'
import styles from './Toast.module.scss'
import BaseButton from '../buttons/BaseButton'
import CheckIcon from 'assets/icons/solid/Check.svg'

const Toast = ({ toast }: { toast: ToastNotification }) => {
  const dispatch = useAppDispatch()
  const remove = () => {
    dispatch(ToastActions.removeToast(toast.id))
  }
  useState(() => {
    setTimeout(() => {
      remove()
    }, toast.delay)
  })

  return (
    <div className={styles.toastNotification}>
      <div className="flex items-start">
        <div className="flex mr-20 items-start">
          <div className="icon">
            <img src={CheckIcon} />
          </div>
          <div>
            <div className="text-12 text-primaryClear">{toast.title}</div>
            {toast.action}
          </div>
        </div>
        <div className="uppercase">
          <BaseButton onClick={() => remove()} xSmall={true} className="px-2">
            Close
          </BaseButton>
        </div>
      </div>
    </div>
  )
}

export default Toast
