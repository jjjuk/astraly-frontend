import { ReactNode } from 'react'
import styles from './Icons.module.scss'
const IconTemplate = ({
  outline,
  solid,
  className,
}: {
  outline: ReactNode
  solid: ReactNode
  className?: string
}) => {
  return (
    <div className={`${styles.icon} ${className} animatedIcon`}>
      <div className={`${styles.iconIcon} ${className} animatedIconOutline`}>{outline}</div>
      <div className={`${styles.iconIcon} ${className} animatedIconSolid`}>{solid}</div>
    </div>
  )
}

import Wallet from 'assets/icons/outline/Wallet.svg?inline'
import WalletSolid from 'assets/icons/solid/Wallet.svg?inline'

export const WalletIcon = (props: any) => {
  return <IconTemplate outline={<Wallet />} solid={<WalletSolid />} {...props} />
}

import Lock from 'assets/icons/currentColor/Unlock.svg?inline'
import LockSolid from 'assets/icons/currentColor/Lock.svg?inline'

export const LockIcon = (props: any) => {
  return <IconTemplate outline={<Lock />} solid={<LockSolid />} {...props} />
}

import Send from 'assets/icons/currentColor/UploadOutline.svg?inline'
import SendSolid from 'assets/icons/currentColor/Upload.svg?inline'

export const SendIcon = (props: any) => {
  return <IconTemplate outline={<Send />} solid={<SendSolid />} {...props} />
}

import Cart from 'assets/icons/currentColor/Shopping-cart-outline.svg?inline'
import CartSolid from 'assets/icons/currentColor/Shopping-cart.svg?inline'

export const CartIcon = (props: any) => {
  return <IconTemplate outline={<Cart />} solid={<CartSolid />} {...props} />
}
