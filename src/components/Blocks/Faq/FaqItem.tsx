import classnames from 'classnames'
import React, { PropsWithChildren, useState } from 'react'
import Hexagon from '../../ui/Hexagon'
import ArrowIcon from 'assets/icons/ArrowDown.svg?inline'

const FaqItem: React.FC<PropsWithChildren<{ question: string }>> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="FaqItem mb-6 block px-8 py-6 min-h-[84px] items-center flex cursor-pointer hover"
      onClick={() => setIsOpen(!isOpen)}>
      <div className="w-full">
        <div
          className={classnames(
            'question font-heading font-bold uppercase flex items-center justify-between w-full',
            isOpen ? 'ui-t-primary mb-2' : 'ui-t-primaryClear'
          )}>
          {question}
          <Hexagon>
            <ArrowIcon
              className={classnames('transform transition', isOpen ? 'rotate-180' : 'rotate-0')}
            />
          </Hexagon>
        </div>
        {isOpen && <div className="response text-black font-bold leading-138">{children}</div>}
      </div>
    </div>
  )
}

export default FaqItem
