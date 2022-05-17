import {useApi} from 'api';
import axios from 'axios';
import {Quest} from 'interfaces';
import {AccountInterface, addAddressPadding, Provider, validateAndParseAddress} from 'starknet';
import {ContractCallOrganizer} from 'starknet-analyzer/lib/organizers/ContractCallOrganizer';
import {TransactionCallOrganizer} from 'starknet-analyzer/lib/organizers/TransactionCallOrganizer';
import {OrganizedEvent} from './types/organizedStarknet';
import {Event} from './types/rawStarknet';
import {uint256ToBN} from 'starknet/utils/uint256';
import {BigNumber} from 'ethers';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const networkName = isMainnet ? 'mainnet-alpha' : 'goerli-alpha';
const provider = new Provider({network: networkName});

const {validateQuest} = useApi();

export const verifyQuest = async (
  txHash: string,
  quest: Quest,
  account: AccountInterface,
  authToken: string | null | undefined
) => {
  if (!quest.event.transmitterContract) return;

  const receipt = await provider.getTransactionReceipt(txHash);
  const trace = await provider.getTransactionTrace(txHash);
  // console.log(receipt);
  // console.log(trace);

  // Check if it comes from the right account
  if (account.address !== trace.function_invocation.contract_address) {
    return;
  }

  let events: OrganizedEvent[] = [];
  // TODO: Fix events when from_address is a Proxy
  for (const event of receipt.events) {
    // Hacky hack
    let _event = event as any;
    if (events.length === 0)
      _event.keys = _event.keys.map((k: string) => validateAndParseAddress(k));

    const _contractCallAnalyzer = await new ContractCallOrganizer(_event.from_address).initialize(
      provider
    );
    // console.log(_contractCallAnalyzer);
    const eventCalldata = await _contractCallAnalyzer.organizeEvent(_event);
    if (eventCalldata) {
      events.push(eventCalldata);
    }
  }
  // console.log(events);

  // Check if events match quest criteria
  let _events = events.find(
    (e: OrganizedEvent) =>
      e.name === quest.event.name &&
      e.transmitterContract === quest.event.transmitterContract &&
      isValidEvent(e, quest)
  );
  console.log(_events);
  if (_events !== undefined) {
    // Validate quest
    await validateQuest(authToken, quest._id);
  }
};

const isValidEvent = (event: OrganizedEvent, quest: Quest) => {
  // Returns true if the event matches the quest criteria
  const _questCalldata = quest.event.calldata[0];
  const _calldata = event.calldata[0];

  const _match = _questCalldata.name === _calldata.name && _questCalldata.type === _calldata.type;
  if (!_match) return false;

  if (_calldata.type === 'Uint256') {
    const _bn1: BigNumber = uint256ToBN(_calldata.value);
    const _bn2: BigNumber = uint256ToBN(_questCalldata.value);
    // User's value should be greater than quest's value
    return _bn1 >= _bn2;
  }
};
