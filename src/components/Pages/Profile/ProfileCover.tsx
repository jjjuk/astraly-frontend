import Copy from 'assets/icons/outline/Copy.svg'
import ProjectLogo from '../../ui/ProjectLogo'
import React from 'react'

const ProfileCover = () => {
  return (
    <div className="ProfileCover mb-6">
      <div className="block ">
        <div className="block--contrast h-50 flex items-center justify-center">
          <div className="border-2 border-primaryClear text-primaryClear font-heading text-12 px-4 rounded-xl py-1 bg-white">
            Add cover image
          </div>
        </div>

        <div className="block__item">
          <div className="-mt-20"></div>
          <ProjectLogo project={{}} />
          <div className="text-primary">Address</div>

          <div className="flex items-center">
            <div className="text-primaryDark font-heading">0x89c...459e</div>
            <img src={Copy} alt={'Copy'} className={'ml-4'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCover
