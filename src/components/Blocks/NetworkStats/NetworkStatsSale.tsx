import { Sale } from './types'
import React from 'react'
import styles from './NetworkStats.module.scss'
import classNames from 'classnames'
import Logo from 'assets/images/zk-lend.svg'

const NetworkStatsSale: React.FC<Sale> = (sale) => {
  console.log({
    Logo,
  })
  return (
    <div
      className={classNames(
        styles.StatSale,
        'NetworkStatsSale font-heading font-bold text-12 block grid px-6 py-4 mb-4 ui-t-primary items-center'
      )}>
      <div className="name flex">
        <div className="icon mr-5">
          <img src={Logo} alt="" />
        </div>
        <div className="text">
          {sale.name} <br />
          <span className="font-sans"> {sale.tokenName}</span>
        </div>
      </div>
      <div className="token-price">{sale.idoPrice}</div>
      <div>{sale.currentPrice}</div>
      <div>{sale.ath}</div>
      <div>{sale.registrations}</div>
      <div>{sale.totalRaised}</div>
      <div>{sale.totalTokens}</div>
      <div>{sale.saleEnded}</div>
      <div className="text-right text-24">
        {Math.round(sale.currentPrice / sale.idoPrice)}
        <span className="text-20">x</span>
      </div>
    </div>
  )
}

export default NetworkStatsSale
