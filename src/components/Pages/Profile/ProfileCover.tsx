import classnames from 'classnames'

import IconCopy from 'assets/icons/outline/Copy.svg'
import IconCopyFull from 'assets/icons/solid/Copy.svg'
import IconCheck from 'assets/icons/solid/Check.svg'

import Pin from 'components/ui/Pin/Pin'
import React, { useCallback, useState, useEffect, FC } from 'react'
import { truncateAddress } from 'utils'
import { copyToClipboard } from 'utils/clipboard'

import styles from './Profile.module.scss'
import CoverImage from './CoverImage'
import AvatarUpload from './AvatarUpload'
import AliasInput from './AliasInput'
import BaseButton from 'components/ui/buttons/BaseButton'
import { useTooltip } from 'context/TooltipProvider'

let timeoutEvent: number | undefined

const ProfileCover: FC<{ user?: any; isSelf?: boolean }> = ({ user, isSelf = false }) => {
  const [showPin, setShowPin] = useState(false)
  const { setShowTooltip } = useTooltip()

  const handleCopyToClipboard = useCallback(() => {
    if (user?.address) {
      copyToClipboard(user?.address).then(() => {
        setShowPin(true)
        timeoutEvent = window?.setTimeout(() => {
          setShowPin(false)
        }, 1000)
      })
    }
  }, [user?.address])

  useEffect(
    () => () => {
      window?.clearTimeout(timeoutEvent)
    },
    []
  )

  return (
    <>
      {user && (
        <div className="ProfileCover mb-6">
          <div className="block">
            <CoverImage user={user} isSelf={isSelf} />
            <div className={classnames(styles.copyAction__container, 'block__item')}>
              <div className="-mt-20"></div>
              <AvatarUpload user={user} isSelf={isSelf} />
              <div className="mb-4"></div>

              <div>
                <div>Address</div>

                <div className="flex items-center">
                  {user.address ? (
                    <div
                      className="flex items-center"
                      role="button"
                      tabIndex={0}
                      onClick={handleCopyToClipboard}
                      onKeyDown={handleCopyToClipboard}>
                      <div className={classnames(styles.copyAction__address, 'font-heading')}>
                        {truncateAddress(user.address)}
                      </div>
                      <div className={`${styles.copyAction__icon} ml-4`}>
                        <img
                          src={IconCopy}
                          alt="Copy"
                          className={styles.copyAction__icon__outline}
                        />
                        <img
                          src={IconCopyFull}
                          alt="Copy"
                          className={styles.copyAction__icon__filled}
                        />
                      </div>
                    </div>
                  ) : isSelf ? (
                    <BaseButton xSmall={true} onClick={() => setShowTooltip(true)}>
                      Connect Wallet
                    </BaseButton>
                  ) : (
                    <div className="font-heading">N/A</div>
                  )}

                  <AliasInput user={user} isSelf={isSelf} />
                </div>
              </div>

              <Pin
                isVisible={showPin}
                style={{ left: '50%', top: '80px', transform: 'translateX(-50%)' }}>
                <div className={styles.copyAction__pin}>
                  Address copied <img src={IconCheck} alt="Address copied" />
                </div>
              </Pin>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileCover
