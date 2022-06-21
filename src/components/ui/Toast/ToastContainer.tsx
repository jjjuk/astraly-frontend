import { ToastNotification } from './utils'
import Toast from './Toast'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/reduxStore'
import styles from './Toast.module.scss'

const ToastContainer = () => {
  const { toasts } = useSelector((state: RootState) => state.Toast)

  return (
    <div className={styles.toastContainer}>
      <TransitionGroup>
        {toasts?.map((toast: ToastNotification) => (
          <CSSTransition key={toast.id} timeout={600} classNames="from-right">
            <Toast toast={toast} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default ToastContainer
