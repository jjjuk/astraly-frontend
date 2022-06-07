import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import QuestRequirements from './QuestRequirements'
import Quests from './Quests'
import Lightning from 'assets/icons/solid/Lightning-alt.svg'

const ProjectQuestsPage = () => {
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
      <ProjectLayout project={project}>
        <QuestRequirements />

        <div className="block mb-4">
          <div className="bg-primaryClearBg rounded-3xl px-8 py-5">
            <div className="flex items-center text-primaryDark">
              <img src={Lightning} alt={''} />
              <ul className={'list-disc ml-8'}>
                <li>
                  <strong>Booster Quests</strong> are optional but provide you with a multiplier of
                  the number of tickets you can get.
                </li>
                <li>It’s also a great opportunity to learn more about the product by using it.</li>
              </ul>
            </div>
          </div>
        </div>

        <Quests />

        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default ProjectQuestsPage
