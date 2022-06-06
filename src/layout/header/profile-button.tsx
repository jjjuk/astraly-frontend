import BaseButton from 'components/ui/buttons/BaseButton'
import Wallet from 'assets/icons/outline/Wallet.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { WalletIcon } from '../../components/ui/Icons/Icons'

const ProfileButton = () => {
  return (
    <div className="profile-button">
      <BaseButton className="px-6">
        <WalletIcon className={'mr-3'} />
        Connect
        <Chevron className={'icon-right ml-3'} />
      </BaseButton>
    </div>
  )
}

export default ProfileButton
