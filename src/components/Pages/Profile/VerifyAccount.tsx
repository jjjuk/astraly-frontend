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
        <BaseButton>Submit your KYC</BaseButton>
      </div>
    </div>
  )
}

export default VerifyAccount
