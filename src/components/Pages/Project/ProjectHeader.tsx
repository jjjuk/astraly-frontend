import Breadcrumbs from './Breadcrumbs'
import { Project } from '../../../interfaces'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Back from 'assets/icons/Back.svg'
import Link from 'next/link'
import Lightning from 'assets/animations/lightning.svg?inline'

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
  buy: 'Purschase',
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
    { href: '/launchpad', label: 'Launchpad' },
    { href: `/project/${project?.id}`, label: project?.name },
  ])
  const [title, setTitle] = useState<string | ReactNode>('')
  const [isQuests, setIsQuests] = useState(false)

  useEffect(() => {
    const steps = [
      { href: '/launchpad', label: 'Launchpad' },
      { href: `/project/${project?.id}`, label: project?.name },
    ]
    let title: string | ReactNode = project?.name || ''
    let isQuests = false

    Object.entries(routes).map(([key, value]) => {
      if (router.route.endsWith(key)) {
        steps.push({ href: `/project/${project?.id}/${key}`, label: value })
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
    <div className="ProjectHeader">
      <Breadcrumbs steps={steps} />

      <div className="title mb-12 flex items-start relative mt-2">
        <Link href={steps[steps.length - 2].href}>
          <a className="inline-flex mt-1.5 mr-6 transition-all hover:transform  hover:scale-110 hover:-translate-y-px rounded-full">
            <div className="back hover:shadow-purpleLight rounded-full">
              <img src={Back} alt={'go back to project'} className={'rounded-full'} />
            </div>
          </a>
        </Link>
        <h1 className="page-title title--big leading-12">{title}</h1>

        {isQuests && (
          <Lightning className={'hidden lg:block lightning_svg absolute right-28 -top-20'} />
        )}
      </div>
    </div>
  )
}

export default ProjectHeader
