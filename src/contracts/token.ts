import {Contracts} from 'constants/networks';
import useContract from 'hooks/useContract';

import {ZKP_TOKEN_ABI} from './abi';
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI';

export const useTokenContract = () => {
  const {getContract} = useContract();

  const getZKPContract = async () => getContract(Contracts[CHAIN].token, ZKP_TOKEN_ABI);

  const getZKPBalance = async address => {
    const contract = await getZKPContract();

    return await contract.call('balanceOf', [address]);
  };

  return {getZKPContract, getZKPBalance};
};
