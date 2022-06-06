import BaseButton from 'components/ui/buttons/BaseButton'
import Wallet from 'assets/icons/outline/Wallet.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import StarkNetLogo from 'assets/images/Starknet-logo-dark1.svg'
import Planets from 'assets/animations/planet.svg?inline'
import Line from 'assets/images/bg-line.svg'
import ShoppingCart from 'assets/icons/currentColor/Shopping-cart.svg?inline'

const HomeHeading = () => {
  return (
    <div className="HomeHeading">
      <div className="bg-line"></div>
      <div className="g-container">
        <div className="flex items-end">
          <div>
            <h1
              className={
                'text-54 text-primaryDark font-heading uppercase text-shadow leading-131 mb-2'
              }>
              Invest in <span className={'text-primary text-shadow'}>Curated</span>
              <br />
              StarkNet projects.
            </h1>
            <p className={'text-24 text-primaryClear max-w-558px mb-12'}>
              <strong>Buy</strong> ZKP tokens and <strong>stake</strong> them and receive lottery
              tickets to <strong>invest</strong> in the listed projects.
            </p>
            <div className="flex buttons">
              <BaseButton className={'px-12 group'}>
                <ShoppingCart />
                Buy $ZKP
                <Chevron className={'ml-2 icon-right'} />
              </BaseButton>

              <div className="flex items-center ml-12">
                <div className="text-16 text-primaryClear leading-138 pt-0.5">Powered by</div>
                <img src={StarkNetLogo} alt={'StarkNet Logo'} className={'ml-2'} />
              </div>
            </div>
          </div>

          <div className="planets ml-auto">
            <Planets />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeading
