import React from 'react'

import { TooltipContext } from './context'

export interface TooltipProviderProps {
  children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps): JSX.Element {
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false)

  return (
    <TooltipContext.Provider value={{ showTooltip, setShowTooltip }}>
      {children}
    </TooltipContext.Provider>
  )
}
