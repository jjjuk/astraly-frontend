import { useQuery } from '@apollo/client'
import { PROJECTS } from '../../api/gql/querries'
import { Project } from '../../interfaces'
import Link from 'next/link'
import Router from 'next/router'
import BaseButton from '../../components/ui/buttons/BaseButton'

const index = () => {
  const { data, error } = useQuery(PROJECTS)

  if (error) {
    Router.replace('/404')
    return <></>
  }

  const Project = ({ project }: { project: Project }) => {
    return (
      <div className={'mb-10'}>
        <div className="text-24 font-heading flex items-center">
          {project.name}
          <Link href={`/admin/project/${project.idoId}`}>
            <a className="inline-block ml-10">
              <BaseButton xSmall={true}>Edit project</BaseButton>
            </a>
          </Link>
        </div>
        <div className="text-18 font-bold">Quests: </div>
        {project.quests &&
          project.quests.map((quest) => (
            <Link key={quest._id} href={`/admin/quests/${quest._id}`}>
              <div className="text-16">{quest.name}</div>
            </Link>
          ))}
        <Link href={`/admin/quests/new?projectIdo=${project.idoId}`}>
          <div className="text-14 text-primary cursor-pointer">+ new quest</div>
        </Link>
      </div>
    )
  }
  return (
    <div className="g-container">
      <div className="w-80">
        <BaseButton className="mb-10">New project</BaseButton>
      </div>

      <div className="index grid grid-cols-3">
        {data &&
          data.projects &&
          data.projects.map((project: Project) => <Project project={project} key={project._id} />)}
      </div>
    </div>
  )
}

export default index
