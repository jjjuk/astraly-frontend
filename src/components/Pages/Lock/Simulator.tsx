/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import BaseInput from '../../ui/inputs/BaseInput'
import DateSelector from './DateSelector'
import BlockLabel from '../../ui/BlockLabel'

const Simulator = ({ currentAPY, zkpBalance }: { currentAPY: number; zkpBalance: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [zkpAmount, setZKPAmount] = useState('0')

  const amounts = ['100', '1000', '10000']

  return (
    <div className="Simulator">
      <div className="headers">
        <div className="lg:flex gap-4 ">
          <div className=" w-147 shrink-0">
            <div className="title small-title pl-8">Staking calculator</div>
          </div>
          <div>
            <div className="title small-title pl-8">Results</div>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-4 items-stretch ">
        <div className="staking lg:w-147 shrink-0 mb-4 md:mb-0">
          <div className="block">
            <div className="total block--contrast">
              <BlockLabel label={'$ZKP staked'} value={'100.00'} />
              <div className="grid grid-cols-5 gap-5">
                <div className="labels grid-cols-3 grid gap-3 items-center col-start-1 col-end-4">
                  {amounts.map((amount) => (
                    <div
                      className="bg-primary rounded-md text-white flex items-center justify-center px-3 pt-1 pb-0.5 text-12 font-bold cursor-pointer"
                      onClick={() => setZKPAmount(amount)}
                      key={amount}>
                      {amount}
                    </div>
                  ))}
                </div>
                <div className="col-start-4 col-end-6">
                  <BaseInput
                    max={Number(zkpBalance)}
                    label={'Total'}
                    value={zkpAmount}
                    onChange={(e) => setZKPAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="block__item">
              <DateSelector startDate={startDate} setStartDate={setStartDate} />
            </div>
          </div>
        </div>

        <div className="block results w-full">
          <div className="block--contrast">
            <div className="text-12 text-primaryClear mb-2">Total</div>

            <div className="flex items-center">
              <p className="text-primaryClear">
                Estimated number of lottery tickets earned per IDO
              </p>
              <div className="ml-4 bg-white text-24 font-heading px-5 pt-2 pb-1.5 text-primaryClear rounded-xl flex items-center justify-center shadow-purpleLight">
                {125}
              </div>
            </div>
          </div>

          <div className="block__item">
            <div className="flex justify-between items-center text-primaryClear pt-6">
              <p>Estimated APY</p>
              <div className="ml-4 bg-white text-24 font-heading px-5 pt-2 pb-1.5 text-primaryClear rounded-xl flex items-center justify-center shadow-purpleLight">
                {currentAPY}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulator
