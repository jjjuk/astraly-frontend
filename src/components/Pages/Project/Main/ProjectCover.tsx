import { Project } from '../../../../interfaces'
import React from 'react'
import ProjectLogo from '../../../ui/ProjectLogo'

const ProjectCover = ({ project }: { project: Project }) => {
  return (
    <div className="block">
      <div className="cover w-full overflow-hidden video-format rounded-3xl">
        <img src={project.cover} alt={''} className={'w-full h-full object-cover'} />
      </div>

      <div className="block__item">
        <div className="-mt-20"></div>
        <ProjectLogo project={project} />

        <div className="font-heading text-primary text-24">{project.name}</div>
        <div className="ticker text-primaryClear font-heading">${project.ticker}</div>
        <div className="flex flex gap-2 mt-8">
          {project.categories &&
            project.categories.map((x, i) => (
              <div
                className={
                  'w-24 flex items-center justify-center font-heading text-white bg-primary text-12 pt-1 rounded-md'
                }
                key={i}>
                {x}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCover
