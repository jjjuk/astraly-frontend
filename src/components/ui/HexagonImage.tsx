import { Project } from '../../interfaces'
import styles from '../../styles/hex.module.scss'
import React, { PropsWithChildren } from 'react'

const HexagonImage = ({ url, children }: PropsWithChildren<{ url?: string }>) => {
  return (
    <>
      <div
        className={`${styles.hex} h-20 w-20 cursor-pointer`}
        style={{ ['--link-logo' as any]: `url(${url})` }}>
        {children}
      </div>

      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooAvatar">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  )
}

export default HexagonImage
