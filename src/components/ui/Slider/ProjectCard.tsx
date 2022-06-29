import React, { useEffect, useState } from 'react'

import { Project, Round } from 'interfaces'
import Link from 'next/link'
import styles from '../../../styles/hexagon.module.scss'

const Item: React.FC<
  React.PropsWithChildren<{
    label: string
  }>
> = ({ children, label }) => {
  return (
    <div className="raise flex items-center justify-between mb-2">
      <div className="text-gray">{label}</div>
      <div className="text-primaryClear font-bold">{children}</div>
    </div>
  )
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [roundTimer, setRoundTimer] = useState('...')
  const [currentRound, setCurrentRound] = useState<Round>()

  const updateRoundTimer = () => {
    const roundId = project.currentRoundIndex
    const roundInfo = project.rounds[roundId]

    if (!roundInfo || new Date(roundInfo.endDate).getTime() < new Date().getTime()) {
      setRoundTimer(`0d0h0m0s`)
      return
    }

    const remainingTime = new Date(roundInfo.endDate).getTime() - new Date().getTime()
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
    setRoundTimer(`${days}d${hours}h${minutes}m${seconds}s`)
  }

  useEffect(() => {
    const roundId = project.currentRoundIndex
    const roundInfo = project.rounds[roundId]
    setCurrentRound(roundInfo)
    const interval = setInterval(() => updateRoundTimer(), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Link href={`/project/${project.idoId}`}>
      <div
        className="ProjectCard bg-white rounded-3xl w-90 shrink-0 relative hover:shadow-purpleDark transition-all cursor-pointer hover:border-primary"
        data-index={index}>
        <div className="claim absolute top-3 right-3 bg-white border border-whitePurple font-heading text-12 py-0.5 px-3 rounded-md text-primaryClear">
          {currentRound?.title || ''} Open
        </div>
        <div className="cover w-full overflow-hidden h-82 rounded-t-3xl">
          <img src={project.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="project-info pt-0 pb-4 px-6">
          <div className="flex items-center justify-between -mt-13">
            <div className="logo">
              <div className={styles.hexBis}>
                <div
                  className={styles.hex}
                  style={{ ['--link-logo' as string]: `url(${project.logo})` }}
                />
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
            <div className="type bg-primary font-bold text-white rounded-md w-16 text-center pt-0.5">
              {project.type}
            </div>
          </div>

          <div className="name font-bold text-24 leading-12">{project.name}</div>
          <div className="ticker font-heading text-primary text-12 mb-6">${project.ticker}</div>
          <Item label={'Total raise'}>ETH {project.totalRaise}</Item>
          <Item label={'Token price'}>ETH {project.tokenPrice}</Item>
          <Item label={'Round closes in'}>{roundTimer}</Item>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
