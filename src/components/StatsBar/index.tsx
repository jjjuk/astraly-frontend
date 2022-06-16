import { Flex, position, Text } from '@chakra-ui/react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useStakingContract } from 'contracts/staking'
import React, { useEffect, useState } from 'react'
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
  // const { account } = useStarknetReact()
  const [currentAPY, setCurrentAPY] = useState(0)
  const [zkpStaked, setZKPStaked] = useState('0')
  const [zkpLPStaked, setZKPLPStaked] = useState('0')

  const { getStakingAPY, getZKPStaked, getZKPLPStaked } = useStakingContract()

  const fetchAPY = async () => {
    try {
      const apr = await getStakingAPY()
      const num_periods = 365 // Compound Daily
      // console.log(apr)
      const apy = (1 + apr / num_periods) ** num_periods - 1
      // console.log(apy)
      setCurrentAPY(apr)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalStaked = async () => {
    try {
      const zkp_staked = await getZKPStaked()
      setZKPStaked(zkp_staked)

      const zkpLP_staked = await getZKPLPStaked()
      setZKPLPStaked(zkpLP_staked)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAPY()
    fetchTotalStaked()
  }, [])

  return (
    <div className="uppercase">
      <Marquee
        style={{
          background: 'white',
          width: '100vw',
          height: '24px',
        }}
        gradient={false}>
        <Stat title="Average APY" value={`${currentAPY.toFixed(3)} %`} />
        <Stat title="Total Value Staked" value="$ 210, 000, 000" />
        <Stat title="ZKP Staked" value={`${Number(zkpStaked).toFixed(2)} ZKP`} />
        <Stat title="ZKP-LP Staked" value={`${zkpLPStaked} ZKP-LP`} />
        <Stat title="Unique Stakers" value="20,000" />
        <Stat title="Average APY" value={`${currentAPY.toFixed(3)} %`} />
        <Stat title="Total Value Staked" value="$ 210, 000, 000" />
        <Stat title="ZKP Staked" value={`${Number(zkpStaked).toFixed(2)} ZKP`} />
        <Stat title="ZKP-LP Staked" value={`${zkpLPStaked} ZKP-LP`} />
        <Stat title="Unique Stakers" value="20,000" />
      </Marquee>
    </div>
  )
}

export default StatsBar
