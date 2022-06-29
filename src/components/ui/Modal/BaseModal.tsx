import React, { useEffect } from 'react'
import styles from './Modal.module.scss'

const BaseModal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void }>> = ({
  children,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    isOpen
      ? document.body.classList.add('modal-open')
      : document.body.classList.remove('modal-open')
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="BaseModal">
      <div
        className={styles.modalBackground}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
      />
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}

export default BaseModal
