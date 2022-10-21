import { Project } from '../../../../../interfaces'
import DueDiligenceMenu from './DueDiligenceMenu'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styles from './dueDiligence.module.scss'
import Star from 'assets/images/star--current.svg?inline'
import Team from './images/team.png'
import ReactMarkdown from 'react-markdown'

const headerHeight = 124

const Separator = () => {
  return (
    <>
      <div className="flex my-10">
        <Star className="inline-block transform -translate-y-1 text-primaryClear" />
        <div className="h-1 bg-primaryClearBg dark:bg-primaryClearBgDark rounded-full w-60 ml-10"></div>
      </div>
    </>
  )
}
const DueDiligence = ({ project }: { project: Project }) => {
  const steps = ['Buy ASTR tokens', 'Stake ASTR tokens', 'Claim lottery tickets', 'Invest in IDOs']
  const HighlightsTitle = useRef<HTMLHeadingElement>(null)
  const SummaryTitle = useRef<HTMLHeadingElement>(null)
  const ProblemTitle = useRef<HTMLHeadingElement>(null)
  const SolutionTitle = useRef<HTMLHeadingElement>(null)
  const RoadmapTitle = useRef<HTMLHeadingElement>(null)
  const TeamTitle = useRef<HTMLHeadingElement>(null)
  const [current, setCurrent] = useState('Highlights')

  const Step = ({ children, index }: PropsWithChildren<{ index: number }>) => {
    return (
      <div className="text-primaryClear text-16">
        <div className="">Step {index + 1}</div>
        <div className="font-bold">{children}</div>
      </div>
    )
  }

  useEffect(() => {
    const watchScroll = () => {
      const HighlightsTitleCurrent =
        (HighlightsTitle.current?.getBoundingClientRect().top ?? 0) - headerHeight
      const SummaryTitleCurrent =
        (SummaryTitle.current?.getBoundingClientRect().top ?? 0) - headerHeight
      const ProblemTitleCurrent =
        (ProblemTitle.current?.getBoundingClientRect().top ?? 0) - headerHeight
      const SolutionTitleCurrent =
        (SolutionTitle.current?.getBoundingClientRect().top ?? 0) - headerHeight
      const RoadmapTitleCurrent =
        (RoadmapTitle.current?.getBoundingClientRect().top ?? 0) - headerHeight
      let current = 'Highlights'

      if (RoadmapTitleCurrent < 0) {
        current = 'Team'
      } else if (SolutionTitleCurrent < 0) {
        current = 'Roadmap'
      } else if (ProblemTitleCurrent < 0) {
        current = 'Solution'
      } else if (SummaryTitleCurrent < 0) {
        current = 'Problem'
      } else if (HighlightsTitleCurrent < 0) {
        current = 'Summary'
      }
      setCurrent(current)
    }
    addEventListener('scroll', watchScroll)
    watchScroll()

    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [])

  const byKey =
    project.projectDescription?.reduce((acc, x) => {
      // @ts-ignore
      acc[x.key] = x.value
      return acc
    }, {} as any) ?? ({} as any)

  return (
    <div className="DueDiligence block p-8 mb-10">
      <div className="lg:flex gap-16">
        <div className="hidden lg:block">
          <DueDiligenceMenu project={project} current={current} />
        </div>

        <div className={`${styles.dueDiligence} lg:pr-40`}>
          <h3 id="Highlights" ref={HighlightsTitle}>
            Highlights
          </h3>
          <ReactMarkdown>{byKey['Highlights']}</ReactMarkdown>
          <Separator />
          <h3 id="Summary" ref={SummaryTitle}>
            What is {project.name} ?
          </h3>
          <ReactMarkdown>{byKey['Summary']}</ReactMarkdown>
          <Separator />
          <h3 id="Problem" ref={ProblemTitle}>
            How does {project.name} work ?
          </h3>
          <ReactMarkdown>{byKey['Problem']}</ReactMarkdown>
          <Separator />
          <h3 id="Solution" ref={SolutionTitle}>
            What’s the vision behind {project.name} ?
          </h3>
          <ReactMarkdown>{byKey['Solution']}</ReactMarkdown>
          <Separator />
          <h3 id="Roadmap" ref={RoadmapTitle}>
            What are the next steps ?
          </h3>
          <ReactMarkdown>{byKey['Roadmap']}</ReactMarkdown>
          <Separator />
          <h3 id="Team" ref={TeamTitle}>
            Who is the team behind {project.name} ?
          </h3>
          <ReactMarkdown>{byKey['Team']}</ReactMarkdown>
          <Separator />
          <h3>Who are their current backers/partners ?</h3>
          <ReactMarkdown>{byKey['Backers']}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default DueDiligence
