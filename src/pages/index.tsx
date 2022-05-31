import { useStarknetReact } from '@web3-starknet-react/core'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import Home from './home'

const ZkPad: NextPage = () => {
  const { account } = useStarknetReact()

  useEffect(() => {
    console.log(account)
  }, [account])

  return <Home />
}

export default ZkPad
