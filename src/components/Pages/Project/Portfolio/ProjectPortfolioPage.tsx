import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'

const ProjectPortfolioPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])

  if (!project) {
    return <></>
  }

  return (
    <>
      <ProjectLayout project={project}></ProjectLayout>
    </>
  )
}

export default ProjectPortfolioPage
