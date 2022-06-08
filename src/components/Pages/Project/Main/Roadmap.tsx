import { Project, Round } from '../../../../interfaces'
import { format } from 'date-fns'
import BaseButton from '../../../ui/buttons/BaseButton'
import Star from 'assets/images/star--current.svg?inline'
import { ConditionalWrapper } from 'components/ui/react'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { SendIcon } from '../../../ui/Icons/Icons'
import CartIcon from 'assets/icons/solid/Cart.svg?inline'
import FireIcon from 'assets/icons/solid/Fire.svg?inline'
import ChartIcon from 'assets/icons/solid/Chart.svg?inline'

const stepsText: { [key: Round['title']]: string | ReactNode[] } = {
  'Ticket Claim': ['Ticket Claim open', 'Claimed', 'claim', <SendIcon key={'claim'} />],
  Allocation: ['Burn lottery tickets', 'Tickets burned', 'burn', <FireIcon key={'burn'} />],
  Purchase: ['Buy and invest', 'Invested', 'buy', <CartIcon key={'buy'} />],
  Distribution: ['Portfolio', 'Portfolio', 'portfolio', <ChartIcon key={'portfolio'} />],
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
      <div className="flex justify-between">
        <div className="flex items-center">
          <Star className="inline-block transform -translate-y-px mr-1" />
          Step {index}
        </div>

        {isActive && stepText[3]}
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
    <div className="Roadmap mb-4 md:mb-0">
      <div className="block bg-whitePurple lg:grid xl:grid-cols-2 2xl:grid-cols-4 ">
        {project.rounds.map((round, index) => (
          <RoadmapItem step={round} project={project} key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Roadmap
