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
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const stepsText: { [key: Round['title']]: string | ReactNode[] } = {
  'Ticket Claim': ['Ticket Claim open', 'Ticket Claim closed', 'claim', <SendIcon key={'claim'} />],
  Allocation: ['Burn lottery tickets', 'Tickets Burn Closed', 'burn', <FireIcon key={'burn'} />],
  Purchase: ['Buy and invest', 'Investing Closed', 'buy', <CartIcon key={'buy'} />],
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
  const isPast = index < project.currentRoundIndex
  const isFuture = index > project.currentRoundIndex

  const stepText = stepsText[step.title]

  useEffect(() => {
    setIsActive(index === project.currentRoundIndex)
  }, [project.currentRoundIndex])

  const ButtonText = isFuture ? 'Not available yet' : stepText[isPast ? 1 : 0]
  const href = `/project/${project.idoId}/${stepText[2]}`

  return (
    <div
      className={`${
        isActive
          ? 'bg-white dark:bg-primaryClearBgDark rounded-3xl ui-t-primary shadow-sm relative z-10 highlight_shadow'
          : 'ui-t-primaryClear'
      } p-3 xl:py-8 xl:px-4 2xl:px-6 flex flex-col`}>
      <div className="flex justify-between">
        <div className="flex items-center text-12 xl:text-16">
          <Star className="inline-block transform -translate-y-px mr-1 " />
          Step {index}
        </div>

        {isActive && stepText[3]}
      </div>

      <div className="font-heading mb-2 text-12">{step.title}</div>
      <div className="text-16 font-bold">{step.description}</div>
      <div className="text-16 mt-auto mb-2 pt-4">
        {format(new Date(step.startDate), 'yyyy-MM-dd')}
      </div>
      {isActive ? (
        <div className='relative z-10'>
          <Link href={href}>
            <a>
              <BaseButton xSmall disabled={!isActive} className={'text-center px-1'}>
                {typeof ButtonText === 'string' ? <ButtonTitle title={ButtonText} /> : ButtonText}
              </BaseButton>
            </a>
          </Link>
        </div>
      ) : (
        <BaseButton xSmall disabled={!isActive} className={'text-center px-1'}>
          {typeof ButtonText === 'string' ? <ButtonTitle title={ButtonText} /> : ButtonText}
        </BaseButton>
      )}
    </div>
  )
}

const Roadmap = ({ project }: { project: Project }) => {
  return (
    <div className="Roadmap mb-4 md:mb-0">
      <div className="block bg-primaryClearBg md:grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 ">
        {project.rounds.map((round, index) => (
          <RoadmapItem step={round} project={project} key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Roadmap
