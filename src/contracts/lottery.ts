import {Contracts} from 'constants/networks';
import useContract from 'hooks/useContract';
import {AccountInterface, Call, number} from 'starknet';
import {toFelt} from 'starknet/dist/utils/number';
import {parseInputAmountToUint256, parseInputAmountToUint256ExecuteCall} from 'utils';

import {LOTTERY_TOKEN_ABI} from './abi';
// import {getHigherGWEI} from 'utils';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI';

export const useLotteryTokenContract = () => {
  const {getContract} = useContract();

  const getLotteryTokenContract = async () =>
    getContract(Contracts[CHAIN].lottery_token, LOTTERY_TOKEN_ABI);

  const claimLotteryTickets = async (id: number.BigNumberish) => {
    const contract = await getLotteryTokenContract();

    return await contract.invoke('claimLotteryTickets', [
      parseInputAmountToUint256(id.toString()),
      []
    ]);
  };

  const burn = async (
    account: AccountInterface | null | undefined,
    id: number.BigNumberish,
    amount: string
  ) => {
    const contract = await getLotteryTokenContract();

    return await contract.invoke('burn', [
      account?.address,
      parseInputAmountToUint256(id.toString()),
      parseInputAmountToUint256(amount, 0)
    ]);
  };

  const burnWithQuest = async (
    account: AccountInterface | null | undefined,
    id: number.BigNumberish,
    amount: string,
    nbQuest: number,
    merkleProof: string[]
  ) => {
    const contract = await getLotteryTokenContract();

    return await contract.invoke('burn_with_quest', [
      account?.address,
      parseInputAmountToUint256(id.toString()),
      parseInputAmountToUint256(amount, 0),
      nbQuest,
      merkleProof
    ]);
  };

  const getTicketsBalance = async (address: string | undefined, id: number.BigNumberish) => {
    const contract = await getLotteryTokenContract();

    return await contract.call('balanceOf', [address, parseInputAmountToUint256(id.toString())]);
  };

  return {
    getLotteryTokenContract,
    claimLotteryTickets,
    burn,
    getTicketsBalance,
    burnWithQuest
  };
};
