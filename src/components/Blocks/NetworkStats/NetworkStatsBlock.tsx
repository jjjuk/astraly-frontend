import { NetworkStat, Sale } from './types'
import NetworkStatItem from './NetworkStatItem'
import NetworkStatsSale from './NetworkStatsSale'
import styles from './NetworkStats.module.scss'
import classnames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { SEARCH_PROJECTS, TOTAL_ACCOUNTS } from 'api/gql/querries'
import { useIDOContract } from 'contracts'
import { Project } from 'interfaces'
import { uint256 } from 'starknet'
import { ethers } from 'ethers'
import { useBlock } from 'context/BlockProvider'

const sales: Sale[] = [
  // {
  //   icon: '',
  //   name: 'ZKLend',
  //   tokenName: 'ZKL',
  //   idoPrice: 0.02,
  //   currentPrice: 0.12,
  //   ath: 'TBA',
  //   registrations: 1232,
  //   totalRaised: '$2,203,32',
  //   totalTokens: '5,000,000',
  //   saleEnded: '5,000,000',
  // },
]

const NetworkStatsBlock = () => {
  const [stats, setStats] = useState<NetworkStat[]>([])
  const [totalSalesInfo, setTotalSalesInfo] = useState<number[]>([0, 0])
  const { data: totalAccounts } = useQuery(TOTAL_ACCOUNTS)
  const { data: finishedProjects } = useQuery(SEARCH_PROJECTS, {
    variables: {
      finished: true,
    },
  })

  const { getCurrentSale } = useIDOContract()

  const { ethPrice } = useBlock()

  const updateSalesInfos = useCallback(async () => {
    if (!finishedProjects) return [0, 0]
    const _salesInfo = await finishedProjects.searchProjects.reduce(
      async (acc: number[], cur: Project) => {
        const _sale = await getCurrentSale(cur.idoId)
        return [
          acc[0] +
            Number(
              ethers.utils.formatUnits(
                uint256.uint256ToBN(_sale.res.total_raised).toString(),
                'ether'
              )
            ),
          acc[1] + Number(uint256.uint256ToBN(_sale.res.number_of_participants).toString()),
        ]
      },
      [0, 0]
    )
    setTotalSalesInfo(_salesInfo)
  }, [getCurrentSale, finishedProjects])

  useEffect(() => {
    updateSalesInfos()
  }, [finishedProjects])

  useEffect(() => {
    const _stats: NetworkStat[] = [
      {
        title: 'Successful Sales',
        amount: finishedProjects?.searchProjects?.length,
      },
      {
        title: 'Total $USD Raised',
        amount: (totalSalesInfo[0] * (ethPrice || 0))
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      },
      {
        title: 'Total $ETH Raised',
        amount: totalSalesInfo[0].toFixed(3),
      },
      {
        title: 'Total Participants',
        amount: totalSalesInfo[1],
      },
      {
        title: 'Registered Users',
        amount: totalAccounts?.total,
      },
    ]
    setStats(_stats)
  }, [totalAccounts, totalSalesInfo, finishedProjects, ethPrice])

  return (
    <div className="ui-page-block" id="network">
      <div className="g-container">
        <h2 className="t-block-title t-dark">Network Stats</h2>
        <div className="ml-10">
          <div className={classnames(styles.StatsGrid, 'grid gap-6 mb-16 max-w-[1340px]')}>
            {stats.map((x, index) => (
              <NetworkStatItem {...x} key={index} />
            ))}
          </div>

          {sales.length > 0 && (
            <>
              <h3 className="font-heading text-24 t-dark font-bold mb-11">Past Sales</h3>
              <div
                className={classnames(
                  styles.StatSale,
                  'px-6 h-[66px] items-center text-12 font-bold'
                )}>
                <div>Project Name</div>
                <div>IDO Token Price</div>
                <div>Current Price</div>
                <div>ATH</div>
                <div>No. Registrations</div>
                <div>Total Raised</div>
                <div>Total Tokens Sold</div>
                <div>Sale Ended At</div>
                <div className="text-right">ROI</div>
              </div>
              {sales.map((x, index) => (
                <NetworkStatsSale {...x} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NetworkStatsBlock
