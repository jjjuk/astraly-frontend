import { ToastNotification } from './utils'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'
import styles from './Toast.module.scss'
import BaseButton from '../buttons/BaseButton'
import CheckIcon from 'assets/icons/solid/Check.svg'
import CrossIcon from 'assets/icons/solid/Cross_purple.svg'

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

  useEffect(() => {
    let id: any
    if (toast.autoClose) {
      id = setTimeout(() => remove(), toast.delay)
    }

    return () => clearTimeout(id)
  }, [toast])

  return (
    <div className={styles.toastNotificationContainer}>
      <div className={styles.toastNotification}>
        <div className="flex items-start">
          <div className="flex mr-20 items-start">
            <div className="icon">
              <img
                className="bg-purple"
                src={toast.isValid ? CheckIcon : CrossIcon}
                alt="is-valid-icon"
              />
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
    </div>
  )
}

export default Toast
