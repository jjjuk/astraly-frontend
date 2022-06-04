import Breadcrumbs from './Breadcrumbs'
import { Project } from '../../../interfaces'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ProjectHeader = ({ project }: { project?: Project }) => {
  const router = useRouter()
  const [steps, setSteps] = useState([
    { href: '/launchpad', label: 'Launchpad' },
    { href: `/project/${project?.id}`, label: project?.name },
  ])

  useEffect(() => {
    const steps = [
      { href: '/launchpad', label: 'Launchpad' },
      { href: `/project/${project?.id}`, label: project?.name },
    ]

    if (router.route.endsWith('claim')) {
      steps.push({ href: `/project/${project?.id}/claim`, label: 'Claim' })
    }

    setSteps(steps)
  }, [router.route])

  if (!project) {
    return <></>
  }
  return (
    <div className="ProjectHeader">
      <Breadcrumbs steps={steps} />

      <div className="title mb-12">
        <div className="back"></div>
        <h1 className="title--big">{project.name}</h1>
      </div>
    </div>
  )
}

export default ProjectHeader
