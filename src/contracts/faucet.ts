import {Contracts} from 'constants/networks';
import useContract from 'hooks/useContract';

import {FAUCET_ABI} from './abi';
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI';

export const useFaucetContract = () => {
  const {getContract} = useContract();

  const getFaucetContract = async () => getContract(Contracts[CHAIN].faucet, FAUCET_ABI);

  const getAmount = async () => {
    const contract = await getFaucetContract();

    return await contract.call('get_amount', []);
  };

  const getWait = async () => {
    const contract = await getFaucetContract();

    return await contract.call('get_wait', []);
  };

  const getUnlockTime = async (address: string | undefined) => {
    const contract = await getFaucetContract();

    return await contract.call('get_unlock_time', [address]);
  };

  const allowedToWithdraw = async (address: string | undefined) => {
    const contract = await getFaucetContract();

    return await contract.call('allowedToWithdraw', [address]);
  };

  const faucetTransfer = async () => {
    const contract = await getFaucetContract();

    return await contract.invoke('faucet_transfer', []);
  };

  return {getFaucetContract, getAmount, getWait, getUnlockTime, faucetTransfer, allowedToWithdraw};
};
