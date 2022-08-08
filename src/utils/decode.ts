import { useApi } from 'api'
import axios from 'axios'
import { Quest } from 'interfaces'
import { AccountInterface, addAddressPadding, Provider, validateAndParseAddress } from 'starknet'
import { ContractCallOrganizer } from 'starknet-analyzer/lib/organizers/ContractCallOrganizer'
import { TransactionCallOrganizer } from 'starknet-analyzer/lib/organizers/TransactionCallOrganizer'
import { OrganizedEvent } from './types/organizedStarknet'
import { Event } from './types/rawStarknet'
import { uint256ToBN } from 'starknet/utils/uint256'
import { BigNumber } from 'ethers'

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'

const networkName = isMainnet ? 'mainnet-alpha' : 'goerli-alpha'
const provider = new Provider({ network: networkName })

// const { validateQuest } = useApi()

export const verifyQuest = async (
  txHash: string,
  quest: Quest,
  account: AccountInterface
  // authToken: string | null | undefined
) => {
  try {
    if (!quest.event || !quest._id) return false
    const accountEvent = quest.event

    if (!accountEvent.transmitterContract) return

    const receipt = await provider.getTransactionReceipt(txHash)
    const trace = await provider.getTransactionTrace(txHash)
    // console.log(trace)
    // console.log(receipt)

    // Check if it comes from the right account
    if (account.address !== trace.function_invocation.contract_address) {
      return false
    }

    const events: OrganizedEvent[] = []
    // TODO: Fix events when from_address is a Proxy
    for (const event of receipt.events) {
      // Hacky hack
      // const _event = event as any
      // if (events.length === 0)
      //   _event.keys = _event.keys.map((k: string) => validateAndParseAddress(k))

      const _contractCallAnalyzer = await new ContractCallOrganizer(
        (event as any).from_address
      ).initialize(provider)
      // console.log(_contractCallAnalyzer)
      try {
        const eventCalldata = await _contractCallAnalyzer.organizeEvent(event)
        if (eventCalldata) {
          events.push(eventCalldata)
        }
      } catch (e) {
        // console.error(e)
      }
    }

    // Check if events match quest criteria
    const _events = events.find(
      (e: OrganizedEvent) =>
        e.name === accountEvent.name &&
        validateAndParseAddress(e.transmitterContract) ===
          validateAndParseAddress(accountEvent.transmitterContract) &&
        isValidEvent(e, accountEvent, account)
    )
    // console.log(_events)
    if (_events !== undefined) {
      // Validate quest
      // await validateQuest(authToken, quest._id)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

const isValidEvent = (event: any, accountEvent: OrganizedEvent, account: AccountInterface) => {
  // Returns true if the event matches the quest criteria
  const _allQuestCalldata = accountEvent.callData
  const _allCalldata = event.calldata

  for (let index = 0; index < _allQuestCalldata.length; index++) {
    const _calldata = _allCalldata[index]
    const _questCalldata = { ..._allQuestCalldata[index] }
    console.log(_calldata, _questCalldata)
    const _match =
      _questCalldata.name === _calldata.name &&
      _questCalldata.type.toLowerCase() === _calldata.type.toLowerCase()
    if (!_match) return false

    if (_calldata.type === 'Uint256') {
      const _bn1: any = uint256ToBN(_calldata.value)
      const _bn2: any = uint256ToBN(_questCalldata.value.value)
      // User's value should be greater than quest's value
      if (_bn1.lt(_bn2)) return false
    } else {
      let _newValue = _questCalldata.value.value
      if (_questCalldata.value.value === '{account}') {
        _newValue = validateAndParseAddress(account.address)
      }
      if (!BigNumber.from(_newValue).eq(BigNumber.from(_calldata.value))) return false
    }
  }

  return true
}
