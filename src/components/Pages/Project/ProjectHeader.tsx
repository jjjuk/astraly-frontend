import Breadcrumbs from './Breadcrumbs'
import { Project } from '../../../interfaces'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Back from 'assets/icons/Back.svg'
import Link from 'next/link'

const routes = {
  burn: 'Burn for allocation',
  claim: 'Claim your lottery tickets',
  buy: 'Buy and invest',
  portfolio: 'Distribution',
  quests: 'Booster Quests',
}

const titles: { [key: string]: string } = {
  burn: 'Burn',
  claim: 'Claim',
  buy: 'Purschase',
  portfolio: 'Portfolio',
  quests: 'Booster Quests',
}

const ProjectHeader = ({ project }: { project?: Project }) => {
  const router = useRouter()
  const [steps, setSteps] = useState([
    { href: '/launchpad', label: 'Launchpad' },
    { href: `/project/${project?.id}`, label: project?.name },
  ])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const steps = [
      { href: '/launchpad', label: 'Launchpad' },
      { href: `/project/${project?.id}`, label: project?.name },
    ]
    let title = project?.name || ''

    Object.entries(routes).map(([key, value]) => {
      if (router.route.endsWith(key)) {
        steps.push({ href: `/project/${project?.id}/${key}`, label: value })
        title = titles[key]
      }
    })

    setSteps(steps)
    setTitle(title)
  }, [router.route])

  if (!project) {
    return <></>
  }
  return (
    <div className="ProjectHeader">
      <Breadcrumbs steps={steps} />

      <div className="title mb-12 flex items-start">
        <Link href={steps[steps.length - 2].href}>
          <a className="inline-flex mt-3.5 mr-6 transition-all hover:transform  hover:scale-110 hover:-translate-y-px rounded-full">
            <div className="back hover:shadow-purpleLight rounded-full">
              <img src={Back} alt={'go back to project'} className={'rounded-full'} />
            </div>
          </a>
        </Link>

        <h1 className="title--big">{title}</h1>
      </div>
    </div>
  )
}

export default ProjectHeader
