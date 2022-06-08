import { transactions } from './transactions'
import { format } from 'date-fns'
import Link from 'next/link'
import Exclamation from 'assets/icons/Exclamation.svg'

const InvestmentOverview = () => {
  const stats = [
    ['$ZKP Staked', '1,135.56'],
    ['ZKP-LP Staked', '315.24'],
    ['Total $USD invested', '$34,230'],
    ['IDO participations', '3'],
  ]

  return (
    <div className="block">
      <div className="block--contrast">
        <h2 className="title--medium">Investment overview</h2>

        <div className="flex items-center mt-6 ">
          <img src={Exclamation} alt={''} className={'mr-6 flex-shrink-0'} />

          <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-3">
            {stats.map(([label, value], index) => (
              <div key={index}>
                <div className="text-primaryClear">{label}</div>
                <div className="font-heading text-primaryDark text-24">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block__item">
        <div className="title--small mb-5">Last transactions</div>

        <div className="grid grid-cols-3 text-primaryClear px-8 mb-3">
          <div>Interaction</div>
          <div>Date</div>
          <div className="text-right">Transaction</div>
        </div>

        {transactions.map((transaction, index) => (
          <div
            className="grid grid-cols-3 font-heading text-primaryClear bg-primaryClearBg rounded-3xl px-8 py-6 text-12 mb-2"
            key={index}>
            <div>{transaction.action}</div>
            <div>{format(transaction.date, 'dd MMMM yyyy')}</div>
            <div className="text-right text-primary">
              <Link href={'/'}>
                <a className="cursor-pointer">View on Voyager</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestmentOverview
