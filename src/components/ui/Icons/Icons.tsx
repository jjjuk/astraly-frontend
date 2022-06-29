import React from 'react'
import classnames from 'classnames'

import styles from './Icons.module.scss'

const IconTemplate: React.FC<{
  outline: React.ReactNode
  solid: React.ReactNode
  className?: string
}> = ({ outline, solid, className }) => {
  return (
    <div className={classnames(styles.icon, className, 'animatedIcon')}>
      <div className={classnames(styles.iconIcon, className, 'animatedIconOutline')}>{outline}</div>
      <div className={classnames(styles.iconIcon, className, 'animatedIconSolid')}>{solid}</div>
    </div>
  )
}

import Wallet from 'assets/icons/outline/Wallet.svg?inline'
import WalletSolid from 'assets/icons/solid/Wallet.svg?inline'

export const WalletIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Wallet />} solid={<WalletSolid />} {...props} />
}

import Lock from 'assets/icons/currentColor/Unlock.svg?inline'
import LockSolid from 'assets/icons/currentColor/Lock.svg?inline'

export const LockIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Lock />} solid={<LockSolid />} {...props} />
}

import Send from 'assets/icons/currentColor/UploadOutline.svg?inline'
import SendSolid from 'assets/icons/currentColor/Upload.svg?inline'

export const SendIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Send />} solid={<SendSolid />} {...props} />
}

import Cart from 'assets/icons/currentColor/Shopping-cart-outline.svg?inline'
import CartSolid from 'assets/icons/currentColor/Shopping-cart.svg?inline'

export const CartIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Cart />} solid={<CartSolid />} {...props} />
}

import Rocket from 'assets/icons/currentColor/Rocket.svg?inline'
import RocketSolid from 'assets/icons/currentColor/RocketSolid.svg?inline'

export const RocketIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Rocket />} solid={<RocketSolid />} {...props} />
}

import Bolt from 'assets/icons/outline/Lightning-alt.svg?inline'
import BoltSolid from 'assets/icons/currentColor/Lightning-alt.svg?inline'

export const BoltIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Bolt />} solid={<BoltSolid />} {...props} />
}

import Forward from 'assets/icons/outline/Forward.svg?inline'
import ForwardSolid from 'assets/icons/solid/Forward.svg?inline'

export const ForwardIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Forward />} solid={<ForwardSolid />} {...props} />
}

import Like from 'assets/icons/currentColor/Like.svg?inline'
import LikeSolid from 'assets/icons/currentColor/LikeSolid.svg?inline'

export const LikeIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Like />} solid={<LikeSolid />} {...props} />
}

import Checked from 'assets/icons/currentColor/Checked-box--outline.svg?inline'
import CheckedSolid from 'assets/icons/currentColor/Checked-box.svg?inline'

export const CheckedIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Checked />} solid={<CheckedSolid />} {...props} />
}

import Fire from 'assets/icons/currentColor/Fire--outline.svg?inline'
import FireSolid from 'assets/icons/currentColor/Fire.svg?inline'

export const FireIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Fire />} solid={<FireSolid />} {...props} />
}

import Swap from 'assets/icons/currentColor/Swap.svg?inline'
// import SwapSolid from 'assets/icons/currentColor/Swap.svg?inline'

export const SwapIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Swap />} solid={<Swap />} {...props} />
}
