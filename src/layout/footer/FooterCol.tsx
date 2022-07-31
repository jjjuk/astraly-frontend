import React, { FC, ReactElement } from 'react'
import Link from 'next/link'

export const FooterLink: FC<{
  href: string
}> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="font-bold leading-15">{children}</a>
    </Link>
  )
}

const FooterCol: FC<{
  title: string
  icon: React.ReactNode
}> = ({ title, icon, children }) => {
  return (
    <div className="FooterCol flex flex-col gap-2">
      <div className="title mb-2 flex items-center gap-2 justify-center md:justify-start">
        <div className="icon transform -translate-y-0.5"> {icon}</div>
        {title}
      </div>
      {children}{' '}
    </div>
  )
}

export default FooterCol
