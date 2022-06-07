import styles from './Profile.module.scss'
import React, { useState } from 'react'
import Book from 'assets/icons/outline/Book-open.svg'
import Check from 'assets/icons/currentColor/Check.svg?inline'
import User from 'assets/icons/solid/User.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'
import Cross from 'assets/icons/solid/Cross.svg'

import { SUPPORTED_WALLETS } from '../../constants/wallet'
import Link from 'next/link'

const ProfileTooltip = ({ close }: { close: () => void }) => {
  const [isConnected, setIsConnected] = useState(false)

  const getTitle = () => {
    if (isConnected) {
      return (
        <>
          Wallet Connected <Check class={'ml-1'} />
        </>
      )
    } else {
      return <>Choose Wallet</>
    }
  }

  const getContent = () => {
    if (isConnected) {
      return (
        <>
          <Link href={'/profile'}>
            <a
              className="bg-white text-primary rounded-xl flex items-center justify-center text-24 font-bold py-2 mb-4 cursor-pointer"
              onClick={() => close()}>
              <img src={User} className={'mr-1'} alt={''} />
              Your Profile
              <Chevron className={'ml-1'} alt={''} />
            </a>
          </Link>
          <div
            className="font-heading text-12 text-center text-white cursor-pointer"
            onClick={() => setIsConnected(false)}>
            Disconnect
          </div>
        </>
      )
    } else {
      return Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option: any = SUPPORTED_WALLETS[key]
        return (
          <div
            className="bg-white px-4 py-2 mb-2 rounded-xl flex items-center justify-center font-bold text-primary cursor-pointer text-24"
            onClick={() => setIsConnected(true)}>
            <img src={option.icon} alt="option-icon" height={32} width={32} className="mr-2" />
            {option.name}
          </div>
        )
      })
    }
  }

  return (
    <div className={styles.profileTooltip}>
      <div className="close w-8 h-8 ml-auto cursor-pointer" onClick={() => close()}>
        <img src={Cross} alt={'close'} />
      </div>
      <div className="text-white text-16 flex items-center justify-center mb-2 font-bold">
        {getTitle()}
      </div>

      <div className="mb-6">{getContent()}</div>

      <div className="text-12 text-center text-white flex items-center justify-center font-bold">
        <img src={Book} alt={''} className="mr-2" />
        How to get Metamask?
      </div>
    </div>
  )
}

export default ProfileTooltip
