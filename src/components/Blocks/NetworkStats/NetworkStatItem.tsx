import { NetworkStat } from './types'
import React from 'react'

const NetworkStatItem: React.FC<NetworkStat> = (stat) => {
  return (
    <div className="NetworkStatItem block px-6 py-5 ui-t-primary group hover hover:ui-t-primaryClear">
      <div className="title transition">{stat.title}</div>
      <div className="amount font-heading text-24 font-bold transition">{stat.amount}</div>
    </div>
  )
}

export default NetworkStatItem
