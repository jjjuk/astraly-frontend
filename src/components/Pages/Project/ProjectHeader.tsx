import Breadcrumbs from './Breadcrumbs'
import { Project } from '../../../interfaces'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Back from 'assets/icons/Back.svg'
import Link from 'next/link'
import Lightning from 'assets/animations/lightning.svg?inline'
import Hexagon from '../../ui/Hexagon'
import ArrowIcon from 'assets/icons/ArrowDown.svg?inline'
import classnames from 'classnames'

const routes = {
  burn: 'Burn for allocation',
  claim: 'Claim your lottery tickets',
  buy: 'Buy and invest',
  portfolio: 'Distribution',
  quests: 'Booster Quests',
}

const titles: { [key: string]: string | ReactNode } = {
  burn: 'Burn',
  claim: 'Claim',
  buy: 'Purchase',
  portfolio: 'Portfolio',
  quests: (
    <>
      Booster
      <br /> Quests
    </>
  ),
}

const ProjectHeader = ({ project }: { project?: Project }) => {
  const router = useRouter()
  const [steps, setSteps] = useState([
    { href: '/', label: 'Launchpad' },
    { href: `/project/${project?.idoId}`, label: project?.name },
  ])
  const [title, setTitle] = useState<string | ReactNode>('')
  const [isQuests, setIsQuests] = useState(false)

  useEffect(() => {
    const steps = [
      { href: '/', label: 'Launchpad' },
      { href: `/project/${project?.idoId}`, label: project?.name },
    ]
    let title: string | ReactNode = project?.name || ''
    let isQuests = false

    Object.entries(routes).map(([key, value]) => {
      if (router.route.endsWith(key)) {
        steps.push({ href: `/project/${project?.idoId}/${key}`, label: value })
        title = titles[key]
        isQuests = key === 'quests'
      }
    })

    setSteps(steps)
    setTitle(title)
    setIsQuests(isQuests)
  }, [router.route])

  if (!project) {
    return <></>
  }
  return (
    <div className="ProjectHeader xl:mt-10">
      <Breadcrumbs steps={steps} />

      <div className="title mb-12 flex items-start relative mt-2">
        <Link href={steps[steps.length - 2].href}>
          <a className="inline-flex  mr-6 transition-all hover:transform  hover:scale-110 hover:-translate-y-px rounded-full">
            <div className="hidden dark:inline-block">
              <Hexagon fillColor={'#2C2A30'} strokeColor={'#9f24ff'}>
                <ArrowIcon className={classnames('transform transition rotate-90')} />
              </Hexagon>
            </div>
            <div className="dark:hidden">
              <Hexagon>
                <ArrowIcon className={classnames('transform transition rotate-90')} />
              </Hexagon>
            </div>
          </a>
        </Link>
        <div className="flex items-center">
          <h1 className="page-title leading-[54px]">{title}</h1>
          <div className="type bg-primary font-bold text-white rounded-md w-16 text-center pt-0.5 ml-5">
            {project?.type}
          </div>
        </div>

        {isQuests && (
          <Lightning className={'hidden lg:block lightning_svg absolute right-28 -top-[140px]'} />
        )}
      </div>
    </div>
  )
}

export default ProjectHeader
