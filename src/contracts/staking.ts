import {Contracts} from 'constants/networks';
import useContract from 'hooks/useContract';
import {AccountInterface, Call, number} from 'starknet';
import {toFelt} from 'starknet/dist/utils/number';
import {parseInputAmountToUint256, parseInputAmountToUint256ExecuteCall} from 'utils';

import {XZKP_TOKEN_ABI} from './abi';
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI';

export const useStakingContract = () => {
  const {getContract} = useContract();

  const getXZKPContract = async () => getContract(Contracts[CHAIN].staking, XZKP_TOKEN_ABI);

  const depositForTime = async (
    amount: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract();

    const _approveTx: Call = {
      contractAddress: Contracts[CHAIN].token,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amount)]
    };

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositForTime',
      calldata: [...parseInputAmountToUint256ExecuteCall(amount), account.address, toFelt(lockTime)]
    };

    return await account.execute([_approveTx, _depositTx]);
  };

  const depositLP = async (
    lpToken: string,
    amount: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract();

    const _approveTx: Call = {
      contractAddress: lpToken,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amount)]
    };

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositLP',
      calldata: [
        lpToken,
        ...parseInputAmountToUint256ExecuteCall(amount),
        account.address,
        toFelt(lockTime)
      ]
    };

    return await account.execute([_approveTx, _depositTx]);
  };

  const depositAll = async (
    lpToken: string,
    amountLP: string,
    amountZKP: string,
    account: AccountInterface,
    lockTime: number.BigNumberish
  ) => {
    const contract = await getXZKPContract();

    const _approveTx: Call = {
      contractAddress: Contracts[CHAIN].token,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amountZKP)]
    };

    const _depositTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'depositForTime',
      calldata: [
        ...parseInputAmountToUint256ExecuteCall(amountZKP),
        account.address,
        toFelt(lockTime)
      ]
    };

    // const _approveLPTx: Call = {
    //   contractAddress: lpToken,
    //   entrypoint: 'approve',
    //   calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(amountLP)]
    // };

    // const _depositLPTx: Call = {
    //   contractAddress: contract.address,
    //   entrypoint: 'depositLP',
    //   calldata: [
    //     lpToken,
    //     ...parseInputAmountToUint256ExecuteCall(amountLP),
    //     account.address,
    //     toFelt(lockTime)
    //   ]
    // };

    return await account.execute([_approveTx, _depositTx]);
  };

  const redeem = async (shares: string, account: AccountInterface) => {
    const contract = await getXZKPContract();

    const _approveTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'approve',
      calldata: [contract.address, ...parseInputAmountToUint256ExecuteCall(shares)]
    };

    const _redeemTx: Call = {
      contractAddress: contract.address,
      entrypoint: 'redeem',
      calldata: [...parseInputAmountToUint256ExecuteCall(shares), account.address, account.address]
    };

    return await account.execute([_approveTx, _redeemTx]);
  };

  const previewDeposit = async (amount: string, lockTime: number.BigNumberish) => {
    const contract = await getXZKPContract();

    return await contract.call('previewDepositForTime', [
      parseInputAmountToUint256(amount),
      toFelt(lockTime)
    ]);
  };

  const getUserStakeInfo = async (address: string | undefined) => {
    const contract = await getXZKPContract();

    return await contract.call('getUserStakeInfo', [address]);
  };

  const previewDepositLP = async (lpToken: string, amount: string, lockTime: number) => {
    const contract = await getXZKPContract();

    // const isWhitelisted = await contract.call('isTokenWhitelisted', [lpToken]);

    return await contract.call('previewDepositLP', [
      lpToken,
      parseInputAmountToUint256(amount),
      toFelt(lockTime)
    ]);
  };

  return {
    getXZKPContract,
    depositForTime,
    previewDeposit,
    previewDepositLP,
    depositLP,
    depositAll,
    redeem,
    getUserStakeInfo
  };
};
