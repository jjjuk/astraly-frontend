import { Dispatch, SetStateAction } from 'react'

export interface TooltipManagerState {
  showTooltip: boolean
  setShowTooltip: Dispatch<SetStateAction<boolean>>
}

export const BLOCK_STATE_INITIAL_STATE: TooltipManagerState = {
  showTooltip: false,
  setShowTooltip: () => {},
}
