import Copy from 'assets/icons/outline/Copy.svg'
import ProjectLogo from '../../ui/ProjectLogo'
import React from 'react'
import { truncateAddress } from 'utils'
import { useStarknetReact } from '@web3-starknet-react/core'

const ProfileCover = () => {
  const { account } = useStarknetReact()

  return (
    <>
      {account && (
        <div className="ProfileCover mb-6">
          <div className="block ">
            <div className="block--contrast h-50 flex items-center justify-center">
              <div className="border-2 border-primaryClear text-primaryClear font-heading text-12 px-4 rounded-xl py-1 bg-white">
                Add cover image
              </div>
            </div>

            <div className="block__item">
              <div className="-mt-20"></div>
              <ProjectLogo />
              <div className="text-primary">Address</div>

              <div className="flex items-center">
                <div className="text-primaryDark font-heading">
                  {truncateAddress(account.address)}
                </div>
                <img src={Copy} alt={'Copy'} className={'ml-4'} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileCover
