import { Project, Round } from 'interfaces'
import { format } from 'date-fns'
import BaseButton from 'components/ui/buttons/BaseButton'
import Star from 'assets/images/star--current.svg?inline'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { SendIcon } from 'components/ui/Icons/Icons'
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
      } p-3 xl:py-8 xl:px-6 flex flex-col`}>
      <div className="flex justify-between">
        <div className="flex items-center text-12 xl:text-16">
          <Star className="inline-block transform -translate-y-px mr-1 " />
          Step {index}
        </div>

        {isActive && stepText[3]}
      </div>

      <div className="font-heading mb-2 text-12 xl:text-16">{step.title}</div>
      <div className="text-12 xl:text-16"> {step.description}</div>
      <div className="text-12 xl:text-16  mt-auto mb-2 pt-4">
        {format(step.startDate, 'yyyy-MM-dd')}
      </div>
      {isActive ? (
        <Link href={href}>
          <a>
            <BaseButton small={true} disabled={!isActive} className={'text-center'}>
              {ButtonText}
            </BaseButton>
          </a>
        </Link>
      ) : (
        <BaseButton small={true} disabled={!isActive} className={'text-center'}>
          {ButtonText}
        </BaseButton>
      )}
    </div>
  )
}

const Roadmap = ({ project }: { project: Project }) => {
  return (
    <div className="Roadmap mb-4 md:mb-0">
      <div className="block bg-whitePurple md:grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 ">
        {project.rounds.map((round, index) => (
          <RoadmapItem step={round} project={project} key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Roadmap
