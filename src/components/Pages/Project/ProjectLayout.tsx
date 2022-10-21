import { PropsWithChildren } from 'react'
import ProjectInfos from './Main/ProjectInfos'
import { useRouter } from 'next/router'
import { Project } from '../../../interfaces'
import ProjectHeader from './ProjectHeader'
import Vertical from '../../ui/Separator/Vertical'

const ProjectLayout = ({ children, project }: PropsWithChildren<{ project: Project }>) => {
  const router = useRouter()
  return (
    <div className="ProjectLayout g-container">
      <ProjectHeader project={project} />

      <div className="lg:flex gap-6 mb-10">
        <div className="col-end-3 col-start-1 w-full">{children}</div>

        <div className="hidden lg:block">
          <div className="sticky top-36 left-0">
            <Vertical />
          </div>
        </div>

        <div className={'mt-4 lg:mt-0 lg:w-1/3 flex-shrink-0'}>
          <ProjectInfos project={project} />
        </div>
      </div>
    </div>
  )
}

export default ProjectLayout
