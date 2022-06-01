import BaseButton from 'components/ui/buttons/BaseButton'
import Wallet from 'assets/icons/outline/Wallet.svg'
import Chevron from 'assets/icons/Chevron.svg?inline'

const ProfileButton = () => {
  return (
    <div className="profile-button">
      <BaseButton className="px-6">
        <img src={Wallet} alt={''} />
        Connect
        <Chevron />
      </BaseButton>
    </div>
  )
}

export default ProfileButton
