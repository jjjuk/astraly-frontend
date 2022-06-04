import ProjectHeader from './ProjectHeader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../interfaces'
import { projects } from '../../../utils/data'
import ProjectLayout from './ProjectLayout'
import Roadmap from './Main/Roadmap'
import ProjectCover from './Main/ProjectCover'
import DueDiligence from './Main/DueDiligence/DueDiligence'

const ProjectPage = () => {
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
    <div className="ProjectPage">
      <ProjectLayout project={project}>
        <div className="mb-4">
          <Roadmap project={project} />
        </div>
        <ProjectCover project={project} />
      </ProjectLayout>

      <div className="g-container">
        <DueDiligence project={project} />
      </div>
    </div>
  )
}

export default ProjectPage
