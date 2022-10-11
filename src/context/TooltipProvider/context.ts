import React from 'react'

import type { TooltipManagerState } from './model'
import { BLOCK_STATE_INITIAL_STATE } from './model'

export const TooltipContext = React.createContext<TooltipManagerState>(BLOCK_STATE_INITIAL_STATE)

export function useTooltip() {
  return React.useContext(TooltipContext)
}
