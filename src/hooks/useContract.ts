import {useStarknetReact} from '@web3-starknet-react/core';
import {useCallback} from 'react';
import {Contract, Provider} from 'starknet';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

export default () => {
  const {account} = useStarknetReact();

  const getContract = useCallback(
    async (address, abi) => {
      if (account) {
        return new Contract(abi, address, account);
      }

      const networkName = isMainnet ? 'mainnet-alpha' : 'goerli-alpha';
      const provider = new Provider({network: networkName});

      return new Contract(address, abi, provider);
    },
    [account]
  );

  return {getContract};
};
