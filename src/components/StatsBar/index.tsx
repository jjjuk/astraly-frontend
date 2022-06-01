import { Flex, position, Text } from '@chakra-ui/react'
import React from 'react'
import Marquee from 'react-fast-marquee'

interface Stat {
  title: string
  value: string
}

const Stat = ({ title, value }: Stat) => {
  return (
    <Flex gap="8px" margin="0 12px" padding="2px 0 0 0">
      <Text color="black" fontWeight="black" fontSize="12px">
        {title}
      </Text>
      <Text color="#8F00FF" fontWeight="black" fontSize="12px">
        {value}
      </Text>
    </Flex>
  )
}

const StatsBar = () => {
  return (
    <div className="uppercase">
      <Marquee
        style={{
          background: 'white',
          width: '100vw',
          height: '24px'
        }}
        gradient={false}>
        <Stat title="Average APY" value="83%" />
        <Stat title="Total Value Staked" value="$ 210, 000, 000" />
        <Stat title="ZKP Staked" value="12,000,000 ZKP" />
        <Stat title="ZKP-LP Staked" value="12,000,000 ZKP-LP" />
        <Stat title="Unique Stakers" value="20,000" />
        <Stat title="Average APY" value="83%" />
        <Stat title="Total Value Staked" value="$ 210, 000, 000" />
        <Stat title="ZKP Staked" value="12,000,000 ZKP" />
        <Stat title="ZKP-LP Staked" value="12,000,000 ZKP-LP" />
        <Stat title="Unique Stakers" value="20,000" />
      </Marquee>
    </div>
  )
}

export default StatsBar
