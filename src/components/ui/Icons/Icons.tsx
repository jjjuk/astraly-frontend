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

import Rocket from 'assets/icons/currentColor/Rocket.svg?inline'
import RocketSolid from 'assets/icons/currentColor/RocketSolid.svg?inline'

export const RocketIcon = (props: any) => {
  return <IconTemplate outline={<Rocket />} solid={<RocketSolid />} {...props} />
}

import Bolt from 'assets/icons/outline/Lightning-alt.svg?inline'
import BoltSolid from 'assets/icons/currentColor/Lightning-alt.svg?inline'

export const BoltIcon = (props: any) => {
  return <IconTemplate outline={<Bolt />} solid={<BoltSolid />} {...props} />
}

import Forward from 'assets/icons/outline/Forward.svg?inline'
import ForwardSolid from 'assets/icons/solid/Forward.svg?inline'

export const ForwardIcon = (props: any) => {
  return <IconTemplate outline={<Forward />} solid={<ForwardSolid />} {...props} />
}

import Like from 'assets/icons/currentColor/Like.svg?inline'
import LikeSolid from 'assets/icons/currentColor/LikeSolid.svg?inline'

export const LikeIcon = (props: any) => {
  return <IconTemplate outline={<Like />} solid={<LikeSolid />} {...props} />
}

import Checked from 'assets/icons/currentColor/Checked-box--outline.svg?inline'
import CheckedSolid from 'assets/icons/currentColor/Checked-box.svg?inline'

export const CheckedIcon = (props: any) => {
  return <IconTemplate outline={<Checked />} solid={<CheckedSolid />} {...props} />
}
