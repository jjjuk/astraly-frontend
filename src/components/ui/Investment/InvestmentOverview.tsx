import React, { useEffect, useState } from 'react'

import { transactions } from './transactions'
import { format } from 'date-fns'
import Link from 'next/link'
import Exclamation from 'assets/icons/Exclamation.svg'
// import { useStakingContract } from 'contracts'
// import { useStarknetReact } from '@web3-starknet-react/core'
// import { ethers } from 'ethers'
// import { uint256 } from 'starknet'
import { Contracts } from 'constants/networks'
import { useWallet } from 'context/WalletProvider'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import { getVoyagerLink } from 'utils'

const InvestmentOverview: React.FC = () => {
  const [stats, setStats] = useState([['']])
  const { deposits } = useWallet()

  const { user } = useSelector((state: RootState) => state.Auth)

  const fetchInformation = async () => {
    try {
      const stats = [
        ['$ASTR Staked', Number(deposits[Contracts['SN_GOERLI'].token].normalized).toFixed(2)],
        ['ASTR-LP Staked', Number(deposits[Contracts['SN_GOERLI'].lp_token].normalized).toFixed(2)],
        ['Total $USD invested', '0.0'],
        ['IDO participations', '0'],
      ]
      setStats(stats)
    } catch (e) {
      console.error(e)
      const stats = [
        ['$ASTR Staked', '-'],
        ['ASTR-LP Staked', '-'],
        ['Total $USD invested', '-'],
        ['IDO participations', '-'],
      ]
      setStats(stats)
    }
  }

  useEffect(() => {
    fetchInformation()
  }, [deposits])

  return (
    <div className="block">
      <div className="block--contrast">
        <h2 className="title--medium">Investment overview</h2>

        <div className="flex flex-col md:flex-row items-center mt-6">
          <img
            src={Exclamation}
            alt={''}
            className={'mr-6 flex-shrink-0 self-start md:self-center  mb-6 md:mb-0'}
          />

          <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-3">
            {stats.map(([label, value]) => (
              <div key={`${label}-${value}`}>
                <div className="text-primaryClear">{label}</div>
                <div className="font-heading text-primaryDark text-[18px] md:text-24">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-0 py-7 md:px-8">
        <div className="title--small mb-5 ml-2 md:ml-o">Last transactions</div>

        <div className="grid grid-cols-3 text-primaryClear px-4 md:px-8 mb-3">
          <div>Interaction</div>
          <div>Date</div>
          <div className="text-right">Transaction</div>
        </div>

        {user.transactions &&
          user.transactions.map((transaction: any) => (
            <div
              className="grid grid-cols-3 font-heading text-primaryClear bg-primaryClearBg rounded-3xl  px-4 md:px-8 py-6 text-[10px] md:text-12 mb-2"
              key={transaction?._id}>
              <div>{transaction?.name}</div>
              <div>{format(new Date(transaction?.timestamp), 'dd MMMM yyyy')}</div>
              <div className="text-right text-primary">
                <a
                  className="cursor-pointer"
                  href={getVoyagerLink(transaction?.hash)}
                  target="_blank"
                  rel="noreferrer">
                  View on Voyager
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default InvestmentOverview
