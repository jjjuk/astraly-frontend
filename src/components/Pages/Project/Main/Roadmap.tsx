import { Project, Round } from '../../../../interfaces'
import { format } from 'date-fns'
import BaseButton from '../../../ui/buttons/BaseButton'
import Star from 'assets/images/star--current.svg?inline'
import { ConditionalWrapper } from 'components/ui/react'
import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'

const stepsText: { [key: Round['title']]: string[] } = {
  'Ticket Claim': ['Ticket Claim open', 'Claimed', 'claim'],
  Allocation: ['Burn lottery tickets', 'Tickets burned', 'burn'],
  Purchase: ['Buy and invest', 'Invested', 'buy'],
  Distribution: ['Portfolio', 'Portfolio', 'portfolio'],
}

const RoadmapItem = ({
  step,
  project,
  index,
}: {
  step: Round
  project: Project
  index: number
}) => {
  const [isActive, setIsActive] = useState(false)
  const isPast = index < project.currentRoundId
  const isFuture = index > project.currentRoundId

  const stepText = stepsText[step.title]

  useEffect(() => {
    setIsActive(index === project.currentRoundId)
  }, [project.currentRoundId])

  const ButtonText = isFuture ? 'Not available yet' : stepText[isPast ? 1 : 0]
  const href = `/project/${project.id}/${stepText[2]}`

  return (
    <div
      className={`${
        isActive ? 'bg-white rounded-3xl text-primary' : 'text-primaryClear'
      } py-8 px-6 flex flex-col`}>
      <div className="flex items-center">
        <Star alt={''} className="inline-block transform -translate-y-px mr-1" />
        Step {index}
      </div>
      <div className="font-heading mb-2">{step.title}</div>
      <div className="text"> {step.description}</div>
      <div className="text mt-auto mb-2 pt-4">
        {format(step.startDate, 'yyyy-MM-dd')} {isActive && 'true'}
      </div>
      {isActive ? (
        <Link href={href}>
          <a>
            <BaseButton small={true} disabled={!isActive}>
              {ButtonText}
            </BaseButton>
          </a>
        </Link>
      ) : (
        <BaseButton small={true} disabled={!isActive}>
          {ButtonText}
        </BaseButton>
      )}
    </div>
  )
}

const Roadmap = ({ project }: { project: Project }) => {
  return (
    <div className="Roadmap">
      <div className="block bg-whitePurple grid grid-cols-4">
        {project.rounds.map((round, index) => (
          <RoadmapItem step={round} project={project} key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Roadmap
