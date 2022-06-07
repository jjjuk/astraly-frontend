import BaseButton from 'components/ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import { SendIcon } from '../../ui/Icons/Icons'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useState } from 'react'
import { useStakingContract } from 'contracts/staking'
import { number, Result } from 'starknet'

const Withdraw = ({
  xzkpBalance,
  unlockRemainingTime,
  stakeInfo,
}: {
  xzkpBalance: string
  unlockRemainingTime: number
  stakeInfo: Result
}) => {
  const { account } = useStarknetReact()
  const [withdrawing, setWithdrawing] = useState(false)
  const { redeem } = useStakingContract()

  const handleWithdraw = async () => {
    if (!account?.address) return

    try {
      setWithdrawing(true)
      const tx = await redeem(xzkpBalance, account)
      console.log(tx)
      setWithdrawing(false)
    } catch (e) {
      console.error(e)
      setWithdrawing(false)
    }
  }

  return (
    <div className="Withdraw block">
      <div className="block--contrast">
        <div className="title--medium mb-6">Withdraw Liquid Pool</div>
        <div className="flex items-center justify-between text-16 mb-2">
          <div className="text-primaryClear">ZKP Staked</div>
          <div className="font-heading text-primary">X</div>
        </div>
        <div className="flex items-center justify-between text-16">
          <div className="text-primaryClear">Time left to unlock</div>
          <div className="font-heading text-primary">
            {unlockRemainingTime > 0 ? (
              <>
                Locked until
                {new Date(stakeInfo?.unlock_time?.toNumber() * 1000).toLocaleDateString()} (
                {Math.round(unlockRemainingTime / (1000 * 3600 * 24))} days)
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className="block__item">
        <BaseButton onClick={handleWithdraw} disabled={withdrawing || unlockRemainingTime > 0}>
          <SendIcon className={'mr-2'} />
          Withdraw
        </BaseButton>
      </div>
    </div>
  )
}

export default Withdraw
