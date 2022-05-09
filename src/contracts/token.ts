import {Contracts} from 'constants/networks';
import useContract from 'hooks/useContract';

import {XZKP_TOKEN_ABI, ZKP_TOKEN_ABI} from './abi';
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI';

export const useTokenContract = () => {
  const {getContract} = useContract();

  const getZKPContract = async () => getContract(Contracts[CHAIN].token, ZKP_TOKEN_ABI);
  const getXZKPContract = async () => getContract(Contracts[CHAIN].staking, XZKP_TOKEN_ABI);

  const getZKPBalance = async (address: string | undefined) => {
    const contract = await getZKPContract();

    return await contract.call('balanceOf', [address]);
  };

  const getXZKPBalance = async (address: string | undefined) => {
    const contract = await getXZKPContract();

    return await contract.call('balanceOf', [address]);
  };

  const getLPBalance = async (address: string | undefined, lpToken: string) => {
    const contract = await getContract(lpToken, ZKP_TOKEN_ABI);

    return await contract.call('balanceOf', [address]);
  };

  return {getZKPContract, getZKPBalance, getXZKPBalance, getLPBalance};
};
