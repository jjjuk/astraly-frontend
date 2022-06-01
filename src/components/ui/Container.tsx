import React, { PropsWithChildren } from 'react'

const Container = ({
  children,
  classes,
  className
}: PropsWithChildren<{
  classes?: string
  className?: string
}>) => {
  return <div className={`g-container ${classes} ${className}`}>{children}</div>
}

export default Container
