import BaseButton from 'components/ui/buttons/BaseButton'
import Wallet from 'assets/icons/outline/Wallet.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import StarkNetLogo from 'assets/images/Starknet-logo-dark1.svg'

const HomeHeading = () => {
  return (
    <div className="HomeHeading">
      <h1
        className={'text-54 text-primaryDark font-heading uppercase text-shadow leading-131 mb-2'}>
        Invest in <span className={'text-primary text-shadow'}>Curated</span>
        <br />
        StarkNet projects.
      </h1>
      <p className={'text-24 text-primaryClear max-w-558px mb-12'}>
        <strong>Buy</strong> ZKP tokens and <strong>stake</strong> them and receive lottery tickets
        to <strong>invest</strong> in the listed projects.
      </p>
      <div className="flex">
        <BaseButton className={'px-12'}>
          <Wallet />
          Buy $ZKP
          <Chevron className={'ml-4'} />
        </BaseButton>

        <div className="flex items-center ml-12">
          <div className="text-16 text-primaryClear leading-138 pt-0.5">Powered by</div>
          <img src={StarkNetLogo} alt={'StarkNet Logo'} className={'ml-2'} />
        </div>
      </div>
    </div>
  )
}

export default HomeHeading
