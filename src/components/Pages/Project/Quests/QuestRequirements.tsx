import BaseButton from '../../../ui/buttons/BaseButton'
import Check from 'assets/icons/solid/Check.svg'

const QuestRequirements = () => {
  return (
    <div className="QuestRequirements block mb-4">
      <div className="block--contrast">
        <div className="title--medium">Requirements</div>
        <p className="font-bold text-primaryClear">
          In order to participate in Booster Quest, you’ll need to:
        </p>
      </div>

      <div className="block__item">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold text-center text-primary mb-3 flex items-center justify-center">
              <img src={Check} alt={''} className={'mr-2 transform -translate-y-0.5'} />
              Submit your KYC documents
            </div>
            <BaseButton>Submit your KYC</BaseButton>
          </div>

          <div>
            <div className="font-bold text-center text-primary mb-3 flex items-center justify-center">
              <img src={Check} alt={''} className={'mr-2 transform -translate-y-0.5'} />
              Lock 200 ZKP on our vault
            </div>
            <BaseButton>Submit your KYC</BaseButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestRequirements