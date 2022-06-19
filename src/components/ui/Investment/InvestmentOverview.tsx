import { transactions } from './transactions'
import { format } from 'date-fns'
import Link from 'next/link'
import Exclamation from 'assets/icons/Exclamation.svg'
import { useEffect, useState } from 'react'
import { useStakingContract } from 'contracts/staking'
import { useStarknetReact } from '@web3-starknet-react/core'
import { ethers } from 'ethers'
import { uint256 } from 'starknet'

const InvestmentOverview = () => {
  const { account } = useStarknetReact()

  const [stats, setStats] = useState([['']])
  const { getUserInfo } = useStakingContract()

  const fetchInformation = async () => {
    try {
      const _userInfo = await getUserInfo(account?.address)
      // console.log(_userInfo)
      const _stakedZKP = ethers.utils.formatUnits(
        uint256.uint256ToBN(_userInfo?.info?.amount).toString(),
        'ether'
      )

      const stats = [
        ['$ASTR Staked', _stakedZKP],
        ['ASTR-LP Staked', '0.0'],
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
  }, [])

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
            {stats.map(([label, value], index) => (
              <div key={index}>
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

        {transactions.map((transaction, index) => (
          <div
            className="grid grid-cols-3 font-heading text-primaryClear bg-primaryClearBg rounded-3xl  px-4 md:px-8 py-6 text-[10px] md:text-12 mb-2"
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
