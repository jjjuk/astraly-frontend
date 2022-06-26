import { Contracts } from 'constants/networks'
import useContract from 'hooks/useContract'
import { Call } from 'starknet'

import { MULTICALL_ABI } from './abi'
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI'

export const useMulticallContract = () => {
  const { getContract } = useContract()

  const getMulticallContract = async () => getContract(Contracts[CHAIN].multicall, MULTICALL_ABI)

  const aggregateCalls = async (calls: Call[]) => {
    const contract = await getMulticallContract()

    return await contract.call('aggregate', [...calls])
  }

  return { aggregateCalls }
}
