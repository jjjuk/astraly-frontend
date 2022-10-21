import BaseButton from 'components/ui/buttons/BaseButton'
import { SendIcon } from '../../ui/Icons/Icons'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useState } from 'react'
import { useStakingContract } from 'contracts'
import { Result } from 'starknet'
import { Contracts } from 'constants/networks'
import { useTransactions } from 'context/TransactionsProvider'
import { useAppDispatch } from 'hooks/hooks'
import ToastActions from 'actions/toast.actions'
import { ToastState } from 'components/ui/Toast/utils'
import Spinner from '../../ui/Spinner/Spinner'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

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
  const [withdrawingLP, setWithdrawingLP] = useState(false)
  const { withdraw, withdrawLP, redeem } = useStakingContract()
  const { addTransaction } = useTransactions()
  const dispatch = useAppDispatch()

  const handleWithdraw = async () => {
    if (!account?.address || !zkpStaked) return

    try {
      setWithdrawing(true)
      const tx = await redeem(zkpStaked, account)
      addTransaction(tx, 'Withdraw Tokens', onSuccess, () => {})

      setWithdrawing(false)
    } catch (e) {
      dispatch(
        ToastActions.addToast({
          title: String(e),
          action: <div className="font-heading text-12 ui-t-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      console.error(e)
      setWithdrawing(false)
    }
  }

  const handleWithdrawLP = async () => {
    if (!account?.address || !lpStaked) return

    try {
      setWithdrawingLP(true)
      const tx = await withdrawLP(lpStaked, account, Contracts['SN_GOERLI'].lp_token)
      addTransaction(tx, 'Withdraw LP Tokens', onSuccess, () => {})

      setWithdrawingLP(false)
    } catch (e) {
      dispatch(
        ToastActions.addToast({
          title: String(e),
          action: <div className="font-heading text-12 ui-t-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      console.error(e)
      setWithdrawingLP(false)
    }
  }

  return (
    <div className="Withdraw block">
      <div className="block--contrast">
        <div className="title--medium mb-6">Withdraw Liquid Pool</div>
        <div className="flex items-center justify-between text-16 mb-2">
          <div className="ui-t-primaryClear">ASTR Staked</div>
          <div className="font-heading text-primary">
            {zkpStaked ? Number(zkpStaked).toFixed(3) : <Spinner />}
          </div>
          <div className="ui-t-primaryClear">ETH-ASTR LP Staked</div>
          <div className="font-heading text-primary">
            {lpStaked ? Number(lpStaked).toFixed(3) : <Spinner />}
          </div>
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
        <div className="relative z-10">
          <BaseButton
            onClick={handleWithdraw}
            disabled={withdrawing || unlockRemainingTime > 0 || Number(zkpStaked) === 0}>
            <SendIcon className={'mr-2'} />
            {withdrawing ? <Spinner /> : <ButtonTitle title="Withdraw" />}
          </BaseButton>
        </div>

        {/* <BaseButton
          onClick={handleWithdrawLP}
          disabled={withdrawingLP || unlockRemainingTime > 0 || Number(lpStaked) === 0}
          className="mt-5">
          <SendIcon className={'mr-2'} />
          {withdrawingLP ? <Spinner /> : 'Withdraw LP'}
        </BaseButton> */}
      </div>
    </div>
  )
}

export default Withdraw
