import { useMemo, useState } from 'react'
import BaseButton from 'components/ui/buttons/BaseButton'
import BaseInput from '../../ui/inputs/BaseInput'
import DateSelector from './DateSelector'
import BlockLabel from '../../ui/BlockLabel'
import PlusIcon from 'assets/icons/Plus.svg'
import { LockIcon } from 'components/ui/Icons/Icons'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useStakingContract } from 'contracts/staking'
import { Contracts } from 'constants/networks'

const LockForm = ({ zkpBalance, lpBalance }: { zkpBalance: string; lpBalance: string }) => {
  const { account } = useStarknetReact()

  const [locking, setLocking] = useState(false)

  const [zkpAmount, setZKPAmount] = useState('10.0')
  const [zkpLPAmount, setZKPLPAmount] = useState('0')

  const [startDate, setStartDate] = useState<Date | null>(null)

  const { depositAll } = useStakingContract()

  const lockTime = useMemo(
    () => (startDate ? startDate.getTime() - new Date().getTime() : 0),
    [startDate]
  )

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
      // TODO: toast
      setLocking(false)
    } catch (e) {
      console.error(e)
      setLocking(false)
    }
  }

  return (
    <div className="LockForm">
      <div className="lg:grid grid-cols-3 gap-4">
        <div className="tokens block mb-4 lg:mb-0">
          <div className="token block--contrast">
            <BlockLabel label={'Tokens'} value={zkpBalance} />
            <BaseInput
              max={Number(zkpBalance)}
              label={'ETH'}
              value={zkpAmount}
              onChange={(event) => setZKPAmount(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-center -my-3">
            <img src={PlusIcon} alt={''} />
          </div>

          <div className="pools px-8 py-7 ">
            <BlockLabel label={'Liquid Pools'} value={lpBalance} />
            <BaseInput
              label={'ZKP-LP'}
              max={Number(lpBalance)}
              value={zkpLPAmount}
              onChange={(event) => setZKPLPAmount(event.target.value)}
            />
          </div>
        </div>

        <div className="date grid col-start-2 col-end-4 block">
          <div className="date-input bg-primaryClearBg rounded-3xl px-8 py-7 ">
            <DateSelector startDate={startDate} setStartDate={setStartDate} />
          </div>

          <div className="button px-8 py-7 ">
            <BaseButton onClick={handleLock} disabled={locking}>
              <LockIcon className={'mr-2'} />
              Lock
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockForm
