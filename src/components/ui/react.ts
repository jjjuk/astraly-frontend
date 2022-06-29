import React from 'react'

export const ConditionalWrapper: React.FC<{
  condition: boolean
  wrapper: any
  children: React.ReactNode
}> = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children)
