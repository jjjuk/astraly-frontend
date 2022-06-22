import { ToastNotification, ToastState } from './utils'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'
import styles from './Toast.module.scss'
import BaseButton from '../buttons/BaseButton'
import CheckIcon from 'assets/icons/solid/Check.svg'
import CrossIcon from 'assets/icons/solid/Cross_purple.svg'
import { Spinner } from '@chakra-ui/react'

const getStateIcon = (state: ToastState) => {
  switch (state) {
    case ToastState.LOADING:
      return <Spinner color="#8F00FF" />
      break
    case ToastState.ERROR:
      return <CrossIcon />
      break
    case ToastState.VALID:
      return <CheckIcon />
      break

    default:
      return <CheckIcon />
      break
  }
}

const Toast = ({ toast }: { toast: ToastNotification }) => {
  const dispatch = useAppDispatch()
  const remove = () => {
    dispatch(ToastActions.removeToast(toast.id))
  }

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
            <div className="icon p-2 mr-2">{getStateIcon(toast.state)}</div>
            <div>
              <div className="text-12 text-primary">{toast.title}</div>
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
