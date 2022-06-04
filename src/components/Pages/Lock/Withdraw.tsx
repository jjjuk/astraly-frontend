import BaseButton from 'components/ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'

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
          <img src={UploadIcon} alt={''} />
          Withdraw
        </BaseButton>
      </div>
    </div>
  )
}

export default Withdraw
