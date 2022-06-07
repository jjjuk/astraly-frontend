import { useState } from 'react'
import BaseButton from 'components/ui/buttons/BaseButton'
import BaseInput from '../../ui/inputs/BaseInput'
import DateSelector from './DateSelector'
import BlockLabel from '../../ui/BlockLabel'
import PlusIcon from 'assets/icons/Plus.svg'
import { LockIcon } from 'components/ui/Icons/Icons'

const LockForm = () => {
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')

  const [startDate, setStartDate] = useState<Date | null>(null)

  return (
    <div className="LockForm">
      <div className="lg:grid grid-cols-3 gap-4">
        <div className="tokens block mb-4 lg:mb-0">
          <div className="token block--contrast">
            <BlockLabel label={'Tokens'} value={'100.00'} />
            <BaseInput
              label={'ETH'}
              value={zkpBalance}
              onChange={(event) => setZkpBalance(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-center -my-3">
            <img src={PlusIcon} alt={''} />
          </div>

          <div className="pools px-8 py-7 ">
            <BlockLabel label={'Liquid Pools'} value={'100.00'} />
            <BaseInput
              label={'ZKP-LP'}
              value={lpBalance}
              onChange={(event) => setLPBalance(event.target.value)}
            />
          </div>
        </div>

        <div className="date grid col-start-2 col-end-4 block">
          <div className="date-input bg-primaryClearBg rounded-3xl px-8 py-7 ">
            <DateSelector />
          </div>

          <div className="button px-8 py-7 ">
            <BaseButton>
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
