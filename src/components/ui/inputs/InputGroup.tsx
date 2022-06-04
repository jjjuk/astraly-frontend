import { PropsWithChildren, ReactNode } from 'react'

const InputGroup = ({
  children,
  left,
  onClick,
}: PropsWithChildren<{ left: ReactNode; onClick: any }>) => {
  return (
    <div
      className="InputGroup bg-white border border-whitePurple flex items-center px-4 h-12 justify-between font-heading text-12 rounded-md text-primaryClear focus-within:text-primary focus-within:border-primary cursor-pointer"
      onClick={onClick}>
      <div className="left whitespace-nowrap">{left}</div>
      <div className="input">{children}</div>
    </div>
  )
}

export default InputGroup
