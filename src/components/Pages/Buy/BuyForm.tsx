import BlockLabel from '../../ui/BlockLabel'
import BaseInput from '../../ui/inputs/BaseInput'
import { useState } from 'react'
import BaseButton from '../../ui/buttons/BaseButton'
import PlusIcon from '../../../assets/icons/Plus.svg'
import ArrowDown from 'assets/icons/ArrowDown.svg?inline'
import Toggle from 'components/ui/inputs/Toggle'

const BuyForm = () => {
  const [ethValue, setEthValue] = useState('0')
  const [zkpValue, setZkpValue] = useState('0')

  const [isLocked, setIsLocked] = useState(true)

  return (
    <div className="BuyForm grid grid-cols-3 gap-4">
      <div className="block">
        <div className="block--contrast">
          <BlockLabel label={'You pay'} value={'100.00'} />
          <BaseInput label={'ETH'} value={ethValue} onChange={(e) => setEthValue(e.target.value)} />
        </div>
        <div className="flex items-center justify-center -my-3 text-primaryClear">
          <ArrowDown />
        </div>

        <div className="block__item">
          <div className="ml-4 text-primaryClear">You receive</div>
          <BaseInput label={'ZKP'} value={zkpValue} onChange={(e) => setZkpValue(e.target.value)} />
        </div>
      </div>

      <div className="block col-start-2 col-end-4 ">
        <div className="block--contrast">
          <div className="text-16 font-bold mb-2 text-primaryClear">Locked (Recommended)</div>
          <div className="flex items-center gap-6">
            <Toggle value={isLocked} onClick={() => setIsLocked((oldValue) => !oldValue)} />
            <p className={'text-12 text-primaryClear font-bold'}>
              By ticking this box, you will purchase the tokens AND we will lock them in our vault.
              The tokens you will receive in your wallet are xZKP. <br />
              <strong className="text-primary">
                This will allow you to claim lottery tickets and participate in IDOs.
              </strong>
            </p>
          </div>
        </div>

        <div className="block__item">
          <BaseButton>Buy and lock</BaseButton>
        </div>
      </div>
    </div>
  )
}

export default BuyForm
