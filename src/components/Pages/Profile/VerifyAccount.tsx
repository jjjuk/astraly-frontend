import ButtonTitle from 'components/ui/buttons/ButtonTitle'
import BaseButton from '../../ui/buttons/BaseButton'

const VerifyAccount = () => {
  return (
    <div className="VerifyAccount block mb-6">
      <div className="block--contrast">
        <div className="title--medium">Verify your account </div>
        <p className={'text-primaryClear font-bold'}>
          In order to win an allocation you’ll need to{' '}
        </p>
      </div>

      <div className="block__item">
        <div className="relative z-10">
          <BaseButton disabled>
            <ButtonTitle title="Submit your KYC" />
          </BaseButton>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount
