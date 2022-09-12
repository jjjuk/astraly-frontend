import React from 'react'

import Hexagon from './index'

export const HexagonWrapped: React.FC = ({ children }) => (
  <>
    <div className="hidden dark:inline-block">
      <Hexagon fillColor={'#2C2A30'} strokeColor={'#9f24ff'}>
        {children}
      </Hexagon>
    </div>
    <div className="dark:hidden">
      <Hexagon>{children}</Hexagon>
    </div>
  </>
)
