import { PropsWithChildren, useEffect } from 'react'
import styles from './Modal.module.scss'

const BaseModal = ({ children, isOpen, close }: PropsWithChildren<any>) => {
  useEffect(() => {
    isOpen
      ? document.body.classList.add('modal-open')
      : document.body.classList.remove('modal-open')
  }, [isOpen])

  if (!isOpen) {
    return <></>
  }
  return (
    <div className="BaseModal">
      <div className={styles.modalBackground} onClick={close}></div>
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}

export default BaseModal
