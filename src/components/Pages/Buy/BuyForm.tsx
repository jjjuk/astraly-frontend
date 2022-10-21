import BlockLabel from '../../ui/BlockLabel'
import BaseInput from '../../ui/inputs/BaseInput'
import { useEffect, useState } from 'react'
import BaseButton from '../../ui/buttons/BaseButton'
import ArrowDown from 'assets/icons/ArrowDown.svg?inline'
import Toggle from 'components/ui/inputs/Toggle'
import { CartIcon } from '../../ui/Icons/Icons'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const BuyForm = () => {
  const [ethValue, setEthValue] = useState('0')
  const [zkpValue, setZkpValue] = useState('0')

  const [isLocked, setIsLocked] = useState(true)

  const [title, setTitle] = useState('')
  const [buttonText, setButtonText] = useState('')

  useEffect(() => {
    const title = isLocked ? 'Locked (Recommended)' : 'Buy and lock (Recommended)'
    const buttonText = isLocked ? 'Buy and lock' : 'Buy only'

    setTitle(title)
    setButtonText(buttonText)
  }, [isLocked])

  return (
    <div className="BuyForm lg:grid grid-cols-3 gap-4">
      <div className="block mb-4 lg:mb-0">
        <div className="block--contrast">
          <BlockLabel label={'You pay'} value={'100.00'} onClick={() => setEthValue('100')} />
          <BaseInput label={'ETH'} value={ethValue} onChange={(e) => setEthValue(e.target.value)} />
        </div>
        <div className="flex items-center justify-center -my-3 text-primaryClear">
          <ArrowDown />
        </div>

        <div className="block__item">
          <div className="ml-4 text-primaryClear">You receive</div>
          <BaseInput
            label={'ASTR'}
            value={zkpValue}
            onChange={(e) => setZkpValue(e.target.value)}
          />
        </div>
      </div>

      <div className="block col-start-2 col-end-4 ">
        <div className="block--contrast">
          <div className="text-16 font-bold mb-2 text-primaryClear">{title}</div>
          <div className="flex items-center gap-6">
            <Toggle value={isLocked} onClick={() => setIsLocked((oldValue) => !oldValue)} />
            <p className={'text-12 text-primaryClear font-bold'}>
              By ticking this box, you will purchase the tokens AND we will lock them in our vault.
              The tokens you will receive in your wallet are xASTR. <br />
              <strong className="text-primary">
                This will allow you to claim lottery tickets and participate in IDOs.
              </strong>
            </p>
          </div>
        </div>

        <div className="block__item">
          <BaseButton>
            <CartIcon className={'mr-3'} />
            <ButtonTitle title={buttonText} />
          </BaseButton>
        </div>
      </div>
    </div>
  )
}

export default BuyForm
