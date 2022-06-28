import { PropsWithChildren, ReactNode } from 'react'

const InputGroup = ({
  children,
  left,
  onClick,
}: PropsWithChildren<{ left: ReactNode; onClick: any }>) => {
  return (
    <div className="InputGroup mb-3" onClick={onClick}>
      <div className="left whitespace-nowrap text-12 uppercase mb-1 font-bold">{left}</div>
      <div className="input">{children}</div>
    </div>
  )
}

export default InputGroup
