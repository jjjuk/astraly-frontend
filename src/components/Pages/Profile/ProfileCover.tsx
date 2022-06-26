import classnames from 'classnames'

import IconCopy from 'assets/icons/outline/Copy.svg'
import IconCopyFull from 'assets/icons/solid/Copy.svg'
import IconCheck from 'assets/icons/solid/Check.svg'

import ProjectLogo from '../../ui/ProjectLogo'
import Pin from 'components/ui/Pin/Pin'
import React, { useCallback, useState, useEffect, FormEvent } from 'react'
import { truncateAddress } from 'utils'
import { useStarknetReact } from '@web3-starknet-react/core'
import { copyToClipboard } from 'utils/clipboard'

import styles from './Profile.module.scss'
import { useApi } from '../../../api'
import { useFileChange } from '../../../utils/fileChange'
import { uploadToS3 } from '../../../utils/upload-file'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '../../../api/gql/mutations'
import AuthActions from '../../../actions/auth.actions'
import { useAppDispatch } from '../../../hooks/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/reduxStore'
import CoverImage from './CoverImage'

let timeoutEvent: number | undefined

const ProfileCover = () => {
  const { account } = useStarknetReact()
  const [showPin, setShowPin] = useState(false)

  const handleCopyToClipboard = useCallback(() => {
    if (account?.address) {
      copyToClipboard(account?.address).then(() => {
        setShowPin(true)
        timeoutEvent = window?.setTimeout(() => {
          setShowPin(false)
        }, 1000)
      })
    }
  }, [account?.address])

  useEffect(
    () => () => {
      window?.clearTimeout(timeoutEvent)
    },
    []
  )

  return (
    <>
      {account && (
        <div className="ProfileCover mb-6">
          <div className="block">
            <CoverImage />
            <div className={classnames(styles.copyAction__container, 'block__item')}>
              <div className="-mt-20"></div>
              <ProjectLogo />

              <div
                role="button"
                tabIndex={0}
                className={styles.copyAction}
                onClick={handleCopyToClipboard}
                onKeyDown={handleCopyToClipboard}>
                <div>Address</div>

                <div className="flex items-center">
                  <div className={classnames(styles.copyAction__address, 'font-heading')}>
                    {truncateAddress(account.address)}
                  </div>
                  <div className={`${styles.copyAction__icon} ml-4`}>
                    <img src={IconCopy} alt="Copy" className={styles.copyAction__icon__outline} />
                    <img
                      src={IconCopyFull}
                      alt="Copy"
                      className={styles.copyAction__icon__filled}
                    />
                  </div>
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
