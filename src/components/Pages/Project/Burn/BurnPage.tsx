import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BaseInput from '../../../ui/inputs/BaseInput'
import FireIcon from 'assets/icons/outline/Fire.svg'
import BaseButton from '../../../ui/buttons/BaseButton'

const BurnPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [tickets, setTickets] = useState('100')

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
            <div className="title--medium mb-1">Lottery tickets to burn</div>

            <div className="flex items-center">
              <div className="text-primaryClear font-bold transform translate-y-px">Available</div>

              <div className="font-heading text-primary ml-6">100.00</div>
            </div>
          </div>

          <div className="block__item">
            <div className="grid grid-cols-2 gap-4">
              <BaseInput
                label={'Tickets'}
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
              />

              <BaseButton>
                <img src={FireIcon} alt={''} />
                Burn tickets
              </BaseButton>
            </div>
          </div>
        </div>
        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default BurnPage
