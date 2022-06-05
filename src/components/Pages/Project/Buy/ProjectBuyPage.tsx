import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BlockLabel from '../../../ui/BlockLabel'
import BaseInput from '../../../ui/inputs/BaseInput'
import ArrowDown from 'assets/icons/ArrowDown.svg?inline'
import BaseButton from '../../../ui/buttons/BaseButton'

const ProjectBuyPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)

  const [ethValue, setEthValue] = useState('0')
  const [zkpValue, setZkpValue] = useState('0')

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])

  if (!project) {
    return <></>
  }

  return (
    <>
      <ProjectLayout project={project}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="block">
            <div className="block--contrast">
              <BlockLabel label={'You pay'} value={'100.00'} />
              <BaseInput
                label={'ETH'}
                value={ethValue}
                onChange={(e) => setEthValue(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center -my-3 text-primaryClear">
              <ArrowDown />
            </div>

            <div className="block__item">
              <div className="ml-4 text-primaryClear">You receive</div>
              <BaseInput
                label={'ZKP'}
                value={zkpValue}
                onChange={(e) => setZkpValue(e.target.value)}
              />
            </div>
          </div>

          <div className="block col-span-2">
            <div className="block--contrast">
              <div className="font-bold mb-2 text-primaryClear">Buy information</div>

              <div className="flex items-center justify-between text-16 mb-0.5">
                <div className="text-primaryClear">Token price</div>
                <div className="font-heading text-primary">$ 0.01</div>
              </div>
              <div className="flex items-center justify-between text-16">
                <div className="text-primaryClear">1 ETH equals</div>
                <div className="font-heading text-primary">$ZKL 200.000</div>
              </div>
            </div>

            <div className="block__item">
              <BaseButton>Buy and receive</BaseButton>
            </div>
          </div>
        </div>
        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default ProjectBuyPage
