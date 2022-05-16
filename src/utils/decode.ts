import {useApi} from 'api';
import axios from 'axios';
import {Quest} from 'interfaces';
import {AccountInterface, addAddressPadding, Provider, validateAndParseAddress} from 'starknet';
import {ContractCallOrganizer} from 'starknet-analyzer/lib/organizers/ContractCallOrganizer';
import {TransactionCallOrganizer} from 'starknet-analyzer/lib/organizers/TransactionCallOrganizer';
import {OrganizedEvent} from './types/organizedStarknet';
import {Event} from './types/rawStarknet';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const networkName = isMainnet ? 'mainnet-alpha' : 'goerli-alpha';
const provider = new Provider({network: networkName});

const {validateQuest} = useApi();

export const verifyQuest = async (txHash: string, quest: Quest, account: AccountInterface) => {
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
  for (const event of receipt.events.slice(0, 2)) {
    // Hacky hack
    let _event = event as any;
    if (events.length === 0)
      _event.keys = _event.keys.map((k: string) => validateAndParseAddress(k));

    const _contractCallAnalyzer = await new ContractCallOrganizer(_event.from_address).initialize(
      provider
    );
    const eventCalldata = await _contractCallAnalyzer.organizeEvent(_event);
    if (eventCalldata) {
      events.push(eventCalldata);
    }
  }
  console.log(events);

  // Check if events match quest criteria
  let _events = events.find(
    (e: OrganizedEvent) =>
      e.name === quest.event.name &&
      e.transmitterContract === quest.event.transmitterContract &&
      isValidEvent(e, quest)
  );
  if (_events !== undefined) {
    // Validate quest
    await validateQuest(account);
  }
};

const isValidEvent = (event: OrganizedEvent, quest: Quest) => {
  // Return wether the event matches the quest criteria
  const _questEvent = quest.event;
};
