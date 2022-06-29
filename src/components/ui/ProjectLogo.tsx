import React from 'react'

import { Project } from '../../interfaces'

import styles from '../../styles/hexagon.module.scss'

const ProjectLogo: React.FC<{ project?: Project }> = ({ project }) => {
  return (
    <div className="logo">
      <div className={styles.hexBis}>
        <div
          className={styles.hex}
          style={{ ['--link-logo' as string]: `url(${project?.logo})` }}></div>
      </div>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
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
    </div>
  )
}

export default ProjectLogo
