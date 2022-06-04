import { useState } from 'react'
import LockForm from './LockForm'
import Simulator from './Simulator'
import Withdraw from './Withdraw'
import ClaimPannel from './ClaimPannel'

const LockPage = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')

  return (
    <div className="LockPage mb-10">
      <div className="g-container">
        <h1 className="text-54 font-heading uppercase mb-16 text-primaryDark text-shadow">
          Lock $ZKP
        </h1>

        <div className="grid grid-cols-3 gap-12">
          <div className={'col-end-3 col-start-1'}>
            <div className="mb-10">
              <LockForm />
            </div>
            <div className="mb-10">
              <Simulator />
            </div>

            <Withdraw />
          </div>

          <div>
            <ClaimPannel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockPage
