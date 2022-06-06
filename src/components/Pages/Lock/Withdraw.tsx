import BaseButton from 'components/ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import { SendIcon } from '../../ui/Icons/Icons'

const Withdraw = () => {
  return (
    <div className="Withdraw block">
      <div className="block--contrast">
        <div className="title--medium mb-6">Withdraw Liquid Pool</div>
        <div className="flex items-center justify-between text-16 mb-2">
          <div className="text-primaryClear">ZKP/ZKP-LP available</div>
          <div className="font-heading text-primary">135.00</div>
        </div>
        <div className="flex items-center justify-between text-16">
          <div className="text-primaryClear">Time left to unlock</div>
          <div className="font-heading text-primary">Available now!</div>
        </div>
      </div>

      <div className="block__item">
        <BaseButton>
          <SendIcon className={'mr-2'} />
          Withdraw
        </BaseButton>
      </div>
    </div>
  )
}

export default Withdraw
