import { ReactNode } from 'react'

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean
  wrapper: any
  children: ReactNode
}) => (condition ? wrapper(children) : children)
