import BaseButton from 'components/ui/buttons/BaseButton'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { WalletIcon } from '../../components/ui/Icons/Icons'
import ProfileTooltip from './ProfileTooltip'
import { useState } from 'react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { truncateAddress } from 'utils'

const ProfileButton = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const { account } = useStarknetReact()
  return (
    <>
      {account ? (
        <div className="hidden lg:block profile-button relative">
          <BaseButton className="px-6" onClick={() => setShowTooltip(true)}>
            <WalletIcon className={'mr-3'} />
            {truncateAddress(account.address)}
            <Chevron className={'icon-right ml-3'} />
          </BaseButton>
          {showTooltip && <ProfileTooltip close={() => setShowTooltip(false)} />}
        </div>
      ) : (
        <div className="hidden lg:block profile-button relative">
          <BaseButton className="px-6" onClick={() => setShowTooltip(true)}>
            <WalletIcon className={'mr-3'} />
            Connect
            <Chevron className={'icon-right ml-3'} />
          </BaseButton>
          {showTooltip && <ProfileTooltip close={() => setShowTooltip(false)} />}
        </div>
      )}
    </>
  )
}

export default ProfileButton
