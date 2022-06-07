import BaseButton from 'components/ui/buttons/BaseButton'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { WalletIcon } from '../../components/ui/Icons/Icons'
import ProfileTooltip from './ProfileTooltip'
import { useState } from 'react'

const ProfileButton = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className="profile-button relative">
      <BaseButton className="px-6" onClick={() => setShowTooltip(true)}>
        <WalletIcon className={'mr-3'} />
        Connect
        <Chevron className={'icon-right ml-3'} />
      </BaseButton>
      {showTooltip && <ProfileTooltip close={() => setShowTooltip(false)} />}
    </div>
  )
}

export default ProfileButton
