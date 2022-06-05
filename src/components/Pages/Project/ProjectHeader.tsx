import Breadcrumbs from './Breadcrumbs'
import { Project } from '../../../interfaces'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

      <div className="title mb-12">
        <div className="back"></div>
        <h1 className="title--big">{title}</h1>
      </div>
    </div>
  )
}

export default ProjectHeader
