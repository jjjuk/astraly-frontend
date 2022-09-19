import React, { useEffect, useState } from 'react'

import { Project, ProjectType, Round } from 'interfaces'
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
      <div className="ui-t-primaryClear font-bold">{children}</div>
    </div>
  )
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [roundTimer, setRoundTimer] = useState('...')
  const [currentRound, setCurrentRound] = useState<Round>()

  const updateRoundTimer = () => {
    const roundId = project.currentRoundIndex
    let _date
    if (roundId === -1) {
      _date = project.rounds[0].startDate
    } else {
      _date = project.rounds[roundId].endDate
    }

    if (!_date || new Date(_date).getTime() < new Date().getTime()) {
      setRoundTimer(`0d 0h 0m 0s`)
      return
    }

    const remainingTime = new Date(_date).getTime() - new Date().getTime()
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
    setRoundTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`)
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
        className="ProjectCard bg-white dark:bg-gray3 rounded-3xl w-[344px] max-w-full shrink-0 relative hover:shadow-purpleDark transition-all cursor-pointer hover:border-primary"
        data-index={index}>
        {!project.isFinished && (
          <div className="claim absolute top-3 right-3 bg-white border border-whitePurple font-heading text-12 py-0.5 px-3 rounded-md text-primaryClear">
            {project.currentRoundIndex === -1 ? 'Upcoming' : `${currentRound?.title || ''} Open`}
          </div>
        )}
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
            <div className="type border border-whitePurple bg-white font-bold text-primary rounded-md w-16 text-center pt-0.5">
              {project.type}
            </div>
          </div>
          <div className="mb-6 gap-3 flex items-end">
            <div className="ui-t-primaryClear name font-bold text-24 leading-12">
              {project.name}
            </div>
            {project.type !== ProjectType.INO && (
              <div className="ticker font-bold text-primary text-12 pb-1">${project.ticker}</div>
            )}
          </div>
          <Item label="Total raise">ETH {project.totalRaise}</Item>
          <Item label="Token price">ETH {project.tokenPrice}</Item>
          {!project.isFinished && (
            <Item label={project.currentRoundIndex === -1 ? 'Round starts in' : 'Round closes in'}>
              {roundTimer}
            </Item>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
