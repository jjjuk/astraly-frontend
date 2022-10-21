import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  size?: 'sm' | 'lg' | 'md'
  width?: number | string
  gradient?: boolean
  glowing?: boolean
  disabled?: boolean
  value?: number
  max?: number
  min?: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  size = 'md',
  gradient,
  glowing,
  disabled,
  max = 100,
  min = 0,
  value = 0,
  width = '100%',
  className
}) => {
  const [overflow, setOverflow] = useState<string>('hidden')
  const ref = useRef<HTMLDivElement>(null) // progress bar

  if (value < min) value = min
  if (value > max) value = max

  const progress = (value / (max - min)) * 100

  // handling overflow and drop-shadow
  // TODO: JS transition instead of CSS transition
  useEffect(() => {
    if (!gradient && ref.current && glowing) {
      const curr = ref.current
      setTimeout(() => {
        // here progress bar looks like () and border goes over the container
        if (curr.offsetWidth <= curr.offsetHeight) {
          setOverflow('hidden') // hiding ugly overflow

          //here progress bar looks like (__)
        } else if (curr.offsetWidth > curr.offsetHeight) {
          setOverflow('visible') // revealing beautiful glowing shadow
        }
      }, 150) // css transition duration
    }
  }, [progress, glowing, ref.current])

  return (
    <div
      className={classNames(styles.progressBar, styles[size], {
        [styles.gradient]: !disabled && gradient,
        [styles.glowing]: !gradient && glowing,
        [styles.disabled]: disabled,
      }, className)}>
      <div className={styles.container} style={{ width, overflow }}>
        <div ref={ref} className={styles.indicator} style={{ width: `${progress.toFixed(1)}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
