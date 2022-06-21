import { useStarknetReact } from '@web3-starknet-react/core'
import React from 'react'
import type { GetBlockResponse } from 'starknet'

import { BlockContext } from './context'

export interface BlockHashProviderProps {
  children: React.ReactNode
  interval?: number
}

export function BlockHashProvider({ interval, children }: BlockHashProviderProps): JSX.Element {
  const { library } = useStarknetReact()
  const [blockHash, setBlockHash] = React.useState<string | undefined>(undefined)
  const [blockNumber, setBlockNumber] = React.useState<number | undefined>(undefined)

  const fetchBlockHash = React.useCallback(() => {
    library
      ?.getBlock()
      .then((block: GetBlockResponse) => {
        setBlockHash(block.block_hash)
        // @ts-ignore
        setBlockNumber(block.block_number)
      })
      .catch(console.log)
  }, [library])

  React.useEffect(() => {
    fetchBlockHash()
    const intervalId = setInterval(() => {
      fetchBlockHash()
    }, interval ?? 5000)
    return () => clearInterval(intervalId)
  }, [interval, fetchBlockHash])

  return (
    <BlockContext.Provider value={{ blockHash, blockNumber }}>{children}</BlockContext.Provider>
  )
}
