import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import VueScrollTo from 'vue-scrollto'

import ProjectCard from './ProjectCard'
import Container from '../Container'

import Chevron from 'assets/icons/Chevron.svg?inline'

import { Project } from '../../../interfaces'

const itemClass = 'ProjectCard'

const ArrowButton: React.FC<{
  onClick?: any
  left?: boolean
  isActive?: boolean
}> = ({ onClick, left, isActive }) => {
  return (
    <div
      className={`h-14 w-14 bg-primaryClearBg border-2 border-white shadow-purpleDark text-primaryDark flex items-center justify-center rounded-2xl transition-all ${
        !isActive ? 'opacity-0' : 'cursor-pointer '
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}>
      <div className={classnames({ 'transform rotate-180': left })}>
        <Chevron />
      </div>
    </div>
  )
}

const ProjectsSlider: React.FC<{ projects?: Project[] }> = ({ projects }) => {
  const [current, setCurrent] = useState(0)
  const container = useRef<HTMLDivElement>(null)
  const refContainer = useRef(null)
  const [scroll, setScroll] = useState(null)

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [width, setWidth] = useState(16)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const c = container.current
    if (!c || !projects) {
      return
    }
    const first = c.querySelector(`.${itemClass}`)
    const last = c.querySelector(`.${itemClass}[data-index="${projects.length - 1}"]`)
    const rc = refContainer.current as unknown as HTMLElement

    const scrollListener = _.debounce(() => {
      const start = rc && rc.offsetLeft
      const end = rc && rc.offsetLeft + rc.offsetWidth

      const firstLeftPosition = first ? first.getBoundingClientRect().left : 0
      const lastRightPosition = last ? last.getBoundingClientRect().right : 0

      setCanPrev(start > firstLeftPosition + 5)
      setCanNext(end < lastRightPosition)

      const diff = window.innerWidth - rc.offsetWidth
      const width = diff ? diff / 2 - 32 : 16
      setWidth(width)
    }, 1)

    const resizeListener = () => {
      const windowWidth = window.innerWidth

      // @ts-ignore
      const totalWidth = [...c.querySelectorAll(`.${itemClass}`)].reduce((acc, node: Element) => {
        acc += node.getBoundingClientRect().width + 32
        return acc
      }, 0)

      const packsContainer = c.querySelector('.PackSlider')
      const leftMargin = packsContainer
        ? (windowWidth - packsContainer.getBoundingClientRect().width) / 2
        : 0

      setShowControls(totalWidth >= windowWidth - leftMargin)
    }

    scrollListener()
    resizeListener()
    c.addEventListener('scroll', scrollListener)
    window.addEventListener('resize', resizeListener)

    return () => {
      c.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', resizeListener)
    }
  }, [container.current])

  const prev = () => {
    canPrev && setCurrent((current) => current - 1)
  }

  const next = () => {
    canNext && setCurrent((current) => current + 1)
  }

  const goTo = (index: number) => {
    setCurrent(() => index)
  }

  useEffect(() => {
    scrollTo()
  }, [current])

  const scrollTo = () => {
    if (!projects) {
      return
    }

    if (current < 0) {
      setCurrent(0)
      return
    }
    if (current >= projects.length) {
      setCurrent(projects.length - 1)
      return
    }

    const element = container?.current?.querySelector(`.${itemClass}[data-index="${current}"]`)

    const offset = (refContainer.current as unknown as HTMLElement).offsetLeft * -1

    // @ts-ignore
    scroll && scroll()

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame
    VueScrollTo.scrollTo(element, 200, {
      container: container.current,
      offset,
      x: true,
    })
  }

  return (
    <div className="ProjectsSlider overflow-hidden w-full">
      <Container>
        <div className="ref" ref={refContainer}></div>
        <div className="controls flex justify-between items-center -mb-32 relative z-10 pt-10">
          <ArrowButton onClick={prev} left={true} isActive={canPrev} />
          <ArrowButton onClick={next} isActive={canNext} />
        </div>
      </Container>
      <div className="w-full overflow-auto py-8 no-scrollbar pb-14" ref={container}>
        <Container>
          <div className="PackSlider flex flex-nowrap gap-6">
            {projects &&
              projects.map((project, index) => (
                <ProjectCard project={project} key={`${project.ticker}-${index}`} index={index} />
              ))}
            <div className="w-20 shrink-0"></div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default ProjectsSlider
