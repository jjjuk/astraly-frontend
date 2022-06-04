import Link from 'next/link'
import { ConditionalWrapper } from '../../ui/react'
import { ReactElement } from 'react'
import Star from 'assets/images/star--current.svg?inline'

const Breadcrumbs = ({
  steps,
}: {
  steps: {
    label?: string
    href?: string
  }[]
}) => {
  return (
    <div className="Breadcrumbs text-primaryClear flex gap-2 items-center">
      {steps.map(({ label, href }, index) => {
        const isLast = index === steps.length - 1
        return (
          <>
            <ConditionalWrapper
              key={index}
              condition={!!href}
              wrapper={(children: ReactElement) => <Link href={href ?? ''}>{children}</Link>}>
              <div className={`${isLast && 'text-primary font-bold'}`}>{label}</div>
            </ConditionalWrapper>
            {!isLast && '/'}
            {isLast && (
              <Star alt={''} className="inline-block transform -translate-y-0.5 text-primary" />
            )}
          </>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
