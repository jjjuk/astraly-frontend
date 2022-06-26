import BaseButton from 'components/ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import { SendIcon } from '../../ui/Icons/Icons'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useState } from 'react'
import { useStakingContract } from 'contracts'
import { number, Result, uint256 } from 'starknet'
import { ethers } from 'ethers'
import { Spinner } from '@chakra-ui/react'
import { Contracts } from 'constants/networks'
import { useTransactions } from 'context/TransactionsProvider'
import { useAppDispatch } from 'hooks/hooks'
import ToastActions from 'actions/toast.actions'
import { ToastState } from 'components/ui/Toast/utils'

const Withdraw = ({
  xzkpBalance,
  unlockRemainingTime,
  stakeInfo,
  lpStaked,
  zkpStaked,
  onSuccess,
}: {
  xzkpBalance: string
  unlockRemainingTime: number
  stakeInfo: Result
  lpStaked: string | null
  zkpStaked: string | null
  onSuccess: () => void
}) => {
  const { account } = useStarknetReact()
  const [withdrawing, setWithdrawing] = useState(false)
  const { redeem } = useStakingContract()
  const { addTransaction } = useTransactions()
  const dispatch = useAppDispatch()

  const handleWithdraw = async () => {
    if (!account?.address) return

    try {
      setWithdrawing(true)
      const tx = await redeem(xzkpBalance, account)
      addTransaction(tx, 'Withdraw Tokens', onSuccess, () => {})

      setWithdrawing(false)
    } catch (e) {
      dispatch(
        ToastActions.addToast({
          title: String(e),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      console.error(e)
      setWithdrawing(false)
    }
  }

  return (
    <div className="Withdraw block">
      <div className="block--contrast">
        <div className="title--medium mb-6">Withdraw Liquid Pool</div>
        <div className="flex items-center justify-between text-16 mb-2">
          <div className="text-primaryClear">ASTR Staked</div>
          <div className="font-heading text-primary">{zkpStaked ? zkpStaked : <Spinner />}</div>
          <div className="text-primaryClear">ASTR-LP Staked</div>
          <div className="font-heading text-primary">{lpStaked ? lpStaked : <Spinner />}</div>
        </div>
        <div className="flex items-center justify-between text-16">
          <div className="text-primaryClear">Time left to unlock</div>
          <div className="font-heading text-primary">
            {unlockRemainingTime > 0 ? (
              <>
                Locked until{' '}
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
          {withdrawing ? <Spinner /> : 'Withdraw'}
        </BaseButton>
      </div>
    </div>
  )
}

export default Withdraw
