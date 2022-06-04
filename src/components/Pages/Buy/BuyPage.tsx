import ClaimPannel from '../Lock/ClaimPannel'
import BuyForm from './BuyForm'
import Simulator from '../Lock/Simulator'

const BuyPage = () => {
  return (
    <div className="BuyPage">
      <div className="g-container mb-20">
        <h1 className="title--big mb-16">Lock $ZKP</h1>

        <div className="grid grid-cols-3 gap-12">
          <div className={'col-end-3 col-start-1'}>
            <div className="mb-10">
              <BuyForm />
            </div>

            <Simulator />
          </div>

          <div>
            <ClaimPannel hideHarvest={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyPage
