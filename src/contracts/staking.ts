import { REWARDS_PER_BLOCK, BLOCKS_PER_YEAR } from 'constants/index'
import { Contracts } from 'constants/networks'
import { ethers } from 'ethers'
import useContract from 'hooks/useContract'
import { AccountInterface, Call, number } from 'starknet'
import { toFelt } from 'starknet/dist/utils/number'
import { uint256ToBN } from 'starknet/utils/uint256'
import { parseInputAmountToUint256, parseInputAmountToUint256ExecuteCall } from 'utils'

import { XZKP_TOKEN_ABI } from './abi'
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI'

export const useStakingContract = () => {
  const { getContract } = useContract()

  const getXZKPContract = async () => getContract(Contracts[CHAIN].staking, XZKP_TOKEN_ABI)

  const depositForTime = async (
    amount: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract()

    const _approveTx: Call = {
      contractAddress: Contracts[CHAIN].token,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amount)],
    }

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositForTime',
      calldata: [
        ...parseInputAmountToUint256ExecuteCall(amount),
        account.address,
        toFelt(lockTime),
      ],
    }

    return await account.execute([_approveTx, _depositTx])
  }

  const depositLP = async (
    lpToken: string,
    amount: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract()

    const _approveTx: Call = {
      contractAddress: lpToken,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amount)],
    }

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositLP',
      calldata: [
        lpToken,
        ...parseInputAmountToUint256ExecuteCall(amount),
        account.address,
        toFelt(lockTime),
      ],
    }

    return await account.execute([_approveTx, _depositTx])
  }

  const depositAll = async (
    lpToken: string,
    amountLP: string,
    amountZKP: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract()

    const _approveTx: Call = {
      contractAddress: Contracts[CHAIN].token,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amountZKP)],
    }

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositForTime',
      calldata: [
        ...parseInputAmountToUint256ExecuteCall(amountZKP),
        account.address,
        toFelt(lockTime),
      ],
    }

    const _approveLPTx: Call = {
      contractAddress: lpToken,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amountLP)],
    }

    const _depositLPTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositLP',
      calldata: [
        lpToken,
        ...parseInputAmountToUint256ExecuteCall(amountLP),
        account.address,
        toFelt(lockTime),
      ],
    }
    let calls
    if (Number(amountLP) > 0 && Number(amountZKP) > 0)
      calls = [_approveTx, _approveLPTx, _depositTx, _depositLPTx]
    else if (Number(amountLP) > 0) {
      calls = [_approveLPTx, _depositLPTx]
    } else {
      calls = [_approveTx, _depositTx]
    }
    console.log(calls)

    return await account.execute(calls)
  }

  const redeem = async (shares: string, account: AccountInterface) => {
    const contract = await getXZKPContract()

    const _approveTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(shares)],
    }

    const _redeemTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'redeem',
      calldata: [...parseInputAmountToUint256ExecuteCall(shares), account.address, account.address],
    }

    return await account.execute([_approveTx, _redeemTx])
  }

  const harvestRewards = async () => {
    const contract = await getXZKPContract()

    return await contract.invoke('harvestRewards', [])
  }

  const previewDeposit = async (amount: string, lockTime: number.BigNumberish) => {
    const contract = await getXZKPContract()

    return await contract.call('previewDepositForTime', [
      parseInputAmountToUint256(amount),
      toFelt(lockTime),
    ])
  }

  const getUserStakeInfo = async (address: string | undefined) => {
    const contract = await getXZKPContract()

    return await contract.call('getUserStakeInfo', [address])
  }

  const getUserInfo = async (address: string | undefined) => {
    const contract = await getXZKPContract()

    return await contract.call('userInfo', [address])
  }

  const getUserDeposit = async (address: string | undefined, token: string) => {
    const contract = await getXZKPContract()

    return await contract.call('getUserDeposit', [address, token])
  }

  const getPendingRewards = async (address: string | undefined) => {
    const contract = await getXZKPContract()

    return await contract.call('calculatePendingRewards', [address])
  }

  const previewDepositLP = async (lpToken: string, amount: string, lockTime: number) => {
    const contract = await getXZKPContract()

    // const isWhitelisted = await contract.call('isTokenWhitelisted', [lpToken]);

    return await contract.call('previewDepositLP', [
      lpToken,
      parseInputAmountToUint256(amount),
      toFelt(lockTime),
    ])
  }

  const getTotalStaked = async () => {
    const contract = await getXZKPContract()

    const _totalStaked = await contract.call('totalAssets', [])
    const _totalStakedFormatted = ethers.utils.formatUnits(
      uint256ToBN(_totalStaked.totalManagedAssets).toString(),
      'ether'
    )

    return _totalStakedFormatted
  }
  const getZKPStaked = async () => {
    const contract = await getXZKPContract()

    const _totalStaked = await contract.call('totalFloat', [])
    const _totalStakedFormatted = ethers.utils.formatUnits(
      uint256ToBN(_totalStaked.float).toString(),
      'ether'
    )

    return _totalStakedFormatted
  }
  const getZKPLPStaked = async () => {
    const contract = await getXZKPContract()

    const _totalStaked = await contract.call('totalFloatLP', [])
    const _totalStakedFormatted = ethers.utils.formatUnits(
      uint256ToBN(_totalStaked.float).toString(),
      'ether'
    )

    return _totalStakedFormatted
  }

  const getStakingAPY = async () => {
    const _totalStakedFormatted = await getTotalStaked()
    const _totalRewardPerYear = REWARDS_PER_BLOCK * BLOCKS_PER_YEAR

    const _apr = (_totalRewardPerYear / Number(_totalStakedFormatted)) * 100

    return _apr
  }

  return {
    getXZKPContract,
    depositForTime,
    previewDeposit,
    previewDepositLP,
    depositLP,
    depositAll,
    redeem,
    getUserStakeInfo,
    harvestRewards,
    getStakingAPY,
    getTotalStaked,
    getUserInfo,
    getUserDeposit,
    getPendingRewards,
    getZKPStaked,
    getZKPLPStaked,
  }
}
