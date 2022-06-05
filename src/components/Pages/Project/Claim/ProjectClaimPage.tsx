import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BaseButton from '../../../ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import Unlock from 'assets/icons/outline/Unlock--current.svg?inline'

const ProjectClaimPage = () => {
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
        <div className="block mb-4">
          <div className="block--contrast">
            <div className="title--medium mb-1">Total Claimable Tickets</div>

            <div className="flex items-center">
              <div className="text-primaryClear font-bold transform translate-y-px">Available</div>

              <div className="font-heading text-primary ml-6">100.00</div>
            </div>
          </div>

          <div className="block__item">
            <div className="grid grid-cols-3 gap-4">
              <BaseButton className="col-span-2">
                <img src={UploadIcon} alt={''} /> Claim Tokens
              </BaseButton>
              <BaseButton className="col-span-1">
                <Unlock />
                Lock more $ZKP
              </BaseButton>
            </div>
          </div>
        </div>
        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default ProjectClaimPage
