import React from 'react'

const ButtonTitle: React.FC<{ title: string }> = React.memo(({ title }) => {
  return <p>{title}</p> // left this while was trying to fix text centering
})

export default ButtonTitle
