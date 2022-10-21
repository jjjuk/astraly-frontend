import BaseButton from 'components/ui/buttons/BaseButton'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { WalletIcon } from '../../components/ui/Icons/Icons'
import ProfileTooltip from './ProfileTooltip'
import { useState } from 'react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { truncateAddress } from 'utils'
import { useTooltip } from 'context/TooltipProvider'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const ProfileButton = () => {
  const { showTooltip, setShowTooltip } = useTooltip()
  const { account } = useStarknetReact()
  return (
    <>
      <div className="hidden lg:block profile-button relative ml-8">
        <BaseButton type="secondary" className="px-6" medium onClick={() => setShowTooltip(true)}>
          <WalletIcon className={'mr-3'} />
          <ButtonTitle title={account ? truncateAddress(account.address) : 'Connect'} />
          <Chevron className={'icon-right ml-3'} />
        </BaseButton>
        {showTooltip && <ProfileTooltip close={() => setShowTooltip(false)} />}
      </div>
    </>
  )
}

export default ProfileButton
