import { useState } from 'react'
import LockForm from './LockForm'
import Simulator from './Simulator'
import Withdraw from './Withdraw'
import ClaimPannel from './ClaimPannel'
import Vertical from '../../ui/Separator/Vertical'

const LockPage = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')

  return (
    <div className="LockPage mb-10">
      <div className="g-container">
        <h1 className="page-title font-heading uppercase mb-16 text-primaryDark text-shadow">
          Lock $ZKP
        </h1>

        <div className="lg:flex gap-6">
          <div className={'w-full flex-grow'}>
            <div className="mb-10">
              <LockForm />
            </div>
            <div className="mb-10">
              <Simulator />
            </div>

            <Withdraw />
          </div>

          <div className={'hidden lg:block'}>
            <div className="sticky top-6 left-0">
              <Vertical />
            </div>
          </div>

          <div className={'mt-4 md:mt-0 lg:w-127 flex-shrink-0 '}>
            <ClaimPannel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockPage
