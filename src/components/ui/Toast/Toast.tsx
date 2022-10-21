import React, { useEffect, useCallback } from 'react'

import { ToastNotification, ToastState } from './utils'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'

import BaseButton from '../buttons/BaseButton'

import CheckIcon from 'assets/icons/solid/Check.svg'
import WarningIcon from 'assets/icons/outline/status/Warning.svg'

import styles from './Toast.module.scss'
import Spinner from '../Spinner/Spinner'
import classNames from 'classnames'
import ButtonTitle from '../buttons/ButtonTitle'

const getStateIcon = (state: ToastState) => {
  switch (state) {
    case ToastState.LOADING:
      return <Spinner />

    case ToastState.ERROR:
      return <img width={32} src={WarningIcon} alt="warning-icon" />

    case ToastState.VALID:
      return <img src={CheckIcon} alt="check-icon" />

    default:
      return <img src={CheckIcon} alt="check-icon" />
  }
}

const Toast: React.FC<{ toast: ToastNotification }> = ({ toast }) => {
  const dispatch = useAppDispatch()

  const remove = useCallback(() => {
    dispatch(ToastActions.removeToast(toast.id))
  }, [dispatch, toast.id])

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>
    if (toast.autoClose) {
      id = setTimeout(() => remove(), toast.delay)
    }

    return () => clearTimeout(id)
  }, [toast])

  return (
    <div className={styles.toastNotificationContainer}>
      <div className={styles.toastNotification}>
        <div className="flex items-center">
          <div className="flex mr-20 items-center">
            <div className="icon p-2 mr-2">{getStateIcon(toast.state)}</div>
            <div>
              <div
                className={classNames('ui-t-primary', {
                  'text-12': toast.state !== ToastState.ERROR,
                  'text-16': toast.state === ToastState.ERROR,
                  'font-bold': toast.state === ToastState.ERROR,
                  'text-warning': toast.state === ToastState.ERROR,
                })}>
                {toast.title}
              </div>
              {toast.action}
            </div>
          </div>
          <div className="uppercase">
            <BaseButton onClick={() => remove()} xSmall={true} className="px-2">
              <ButtonTitle title="Close" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toast
