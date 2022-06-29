import React from 'react'

const Container: React.FC<
  React.PropsWithChildren<{
    className?: string
  }>
> = ({ children, className }) => {
  return <div className={`g-container ${className}`}>{children}</div>
}

export default Container
