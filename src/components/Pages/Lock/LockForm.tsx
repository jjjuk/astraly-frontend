import { useEffect, useMemo, useState } from 'react'
import BaseButton from 'components/ui/buttons/BaseButton'
import BaseInput from '../../ui/inputs/BaseInput'
import DateSelector from './DateSelector'
import BlockLabel from '../../ui/BlockLabel'
import PlusIcon from 'assets/icons/Plus.svg'
import { LockIcon } from 'components/ui/Icons/Icons'
import { useStarknetReact } from '@web3-starknet-react/core'
import { Contracts } from 'constants/networks'
import { ethers } from 'ethers'
import { uint256 } from 'starknet'
import { Spinner } from '@chakra-ui/react'
import { useAppDispatch } from 'hooks/hooks'
import ToastActions from 'actions/toast.actions'
import { useTransactions } from 'context/TransactionsProvider'
import { useStakingContract } from 'contracts'

const LockForm = ({
  zkpBalance,
  lpBalance,
  xzkpBalance,
  currentAPY,
  unlockRemainingTime,
  onSuccess,
}: {
  zkpBalance: string
  lpBalance: string
  xzkpBalance: string
  currentAPY: number
  unlockRemainingTime: number
  onSuccess: () => void
}) => {
  const { account } = useStarknetReact()

  const [locking, setLocking] = useState(false)

  const [zkpAmount, setZKPAmount] = useState('10.0')
  const [zkpLPAmount, setZKPLPAmount] = useState('0')

  const [previewXZKP, setPreviewXZKP] = useState('0')
  const [updatingPreview, setUpdatingPreview] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(null)

  const { previewDeposit, previewDepositLP, depositAll } = useStakingContract()

  const lockTime = useMemo(
    () => (startDate ? startDate.getTime() - new Date().getTime() : 0),
    [startDate]
  )

  const dispatch = useAppDispatch()
  const { addTransaction } = useTransactions()

  const handleLock = async () => {
    if (!account?.address) return

    try {
      setLocking(true)
      const _daysPassed = lockTime / (3600 * 24 * 1000)
      const tx = await depositAll(
        Contracts['SN_GOERLI'].lp_token,
        zkpLPAmount,
        zkpAmount,
        account,
        _daysPassed
      )
      addTransaction(tx, 'Lock Tokens', onSuccess, () => {})
      setLocking(false)
    } catch (e) {
      console.error(e)
      setLocking(false)
    }
  }

  const updatePreview = async () => {
    try {
      setUpdatingPreview(true)
      const _daysPassed = lockTime / (3600 * 24 * 1000)
      const _preview = await previewDeposit(zkpAmount, _daysPassed)
      const _formattedShares = ethers.utils.formatUnits(
        uint256.uint256ToBN(_preview.shares).toString(),
        'ether'
      )
      if (Number(zkpLPAmount) > 0) {
        const _previewLP = await previewDepositLP(
          Contracts['SN_GOERLI'].lp_token,
          zkpLPAmount,
          _daysPassed
        )
        const _formattedSharesLP = ethers.utils.formatUnits(
          uint256.uint256ToBN(_previewLP.shares).toString(),
          'ether'
        )
        const _sharesSum = Number(_formattedShares) + Number(_formattedSharesLP)
        setPreviewXZKP(_sharesSum.toString())
      } else {
        setPreviewXZKP(_formattedShares)
      }
      setUpdatingPreview(false)
    } catch (e) {
      console.error(e)
      setUpdatingPreview(false)
    }
  }

  useEffect(() => {
    updatePreview()
  }, [zkpAmount, zkpLPAmount, startDate])

  return (
    <div className="LockForm">
      <div className="lg:grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="tokens block mb-4 lg:mb-0">
          <div className="token block--contrast">
            <BlockLabel
              label={'Tokens'}
              value={Number(zkpBalance).toFixed(3)}
              onClick={() => setZKPAmount(zkpBalance)}
            />
            <BaseInput
              max={Number(zkpBalance)}
              label={'ASTR'}
              value={zkpAmount}
              onChange={(event) => setZKPAmount(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-center -my-3">
            <img src={PlusIcon} alt={''} />
          </div>

          <div className="pools px-8 py-7 ">
            <BlockLabel
              label={'Liquid Pools'}
              value={Number(lpBalance).toFixed(3)}
              onClick={() => setZKPLPAmount(lpBalance)}
            />
            <BaseInput
              label={'ASTR-LP'}
              max={Number(lpBalance)}
              value={zkpLPAmount}
              onChange={(event) => setZKPLPAmount(event.target.value)}
            />
          </div>
        </div>

        <div className="date grid xl:col-start-2 xl:col-end-4 block">
          <div className="date-input bg-primaryClearBg rounded-3xl px-8 py-7 ">
            <DateSelector startDate={startDate} setStartDate={setStartDate} />
          </div>

          <div className="button px-8 py-7 ">
            <BaseButton
              onClick={handleLock}
              disabled={
                locking ||
                lockTime < unlockRemainingTime ||
                Number(zkpAmount) > Number(zkpBalance) ||
                Number(zkpLPAmount) > Number(lpBalance)
              }>
              <LockIcon className={'mr-2'} />
              Lock
            </BaseButton>
          </div>
        </div>
      </div>
      <div className="block results w-full mt-8">
        <div className="block--contrast">
          <div className="text-12 text-primaryClear font-bold mb-2">Total</div>

          <div className="flex items-center justify-between">
            <p className="text-primaryClear">Estimated number of lottery tickets earned per IDO</p>
            <div className="ml-4 bg-white text-24 font-heading px-5 pt-2 pb-1.5 text-primaryClear rounded-xl flex items-center justify-center shadow-purpleLight">
              {updatingPreview ? (
                <Spinner />
              ) : (
                Math.floor(Math.pow(Number(xzkpBalance) + Number(previewXZKP), 0.6))
              )}
            </div>
          </div>
        </div>

        <div className="block__item">
          <div className="flex justify-between items-center text-primaryClear pt-6">
            <p>Estimated APY</p>
            <div className="ml-4 bg-white text-24 font-heading px-5 pt-2 pb-1.5 text-primaryClear rounded-xl flex items-center justify-center shadow-purpleLight">
              {currentAPY.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockForm
