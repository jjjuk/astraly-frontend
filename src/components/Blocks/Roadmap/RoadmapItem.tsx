import React, { PropsWithChildren } from 'react'
import styles from './RoadmapItem.module.scss'
import classnames from 'classnames'
import StarImage from 'assets/images/roadmap-star.png'

const RoadmapItem: React.FC<PropsWithChildren<{ date: string; title: string }>> = ({
  date,
  title,
  children,
}) => {
  return (
    <div
      className={classnames(styles.RoadmapItem, 'flex flex-col md:flex-row mb-16 gap-10 md:gap-0')}>
      <div className="left font-heading md:text-right w-[215px] flex-shrink-0">
        <div className="date text-16">{date}</div>
        <div className="title text-24 ui-t-dark">{title}</div>
      </div>
      <div className="hidden md:flex separator mx-8 lg:ml-10 lg:mr-16 flex-shrink-0 flex-col items-center">
        <img
          src={StarImage.src}
          alt={''}
          className="-mt-8 transition hover:scale-110 hover:translate-y-1"
        />
        <div className="w-0.5 h-[97px] bg-primaryClearBg dark:bg-gray3 rounded-full"></div>
      </div>
      <div className="content">{children}</div>
    </div>
  )
}

export default RoadmapItem
