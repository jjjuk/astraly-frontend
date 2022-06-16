import { Project } from '../../../../interfaces'
import ProjectLogo from '../../../ui/ProjectLogo'
import BaseButton from '../../../ui/buttons/BaseButton'
import Link from 'next/link'
import { BoltIcon, RocketIcon } from '../../../ui/Icons/Icons'
import Award from 'assets/icons/solid/Award.svg'
import Shield from 'assets/icons/solid/Shield.svg'
import Notification from 'assets/icons/solid/Notification.svg'
import Hint from '../../../ui/Hint/Hint'

const ProjectInfos = ({ project }: { project: Project }) => {
  return (
    <div className="ProjectInfos sticky top-6 left-0">
      <div className="block mb-4">
        <div className="block--contrast py-3">
          <div className="flex items-center relative">
            <div className="logo">
              <ProjectLogo project={project} />
            </div>
            <div className="info ml-4">
              <div className="text-16 text-primaryClear font-bold">Apply and invest in</div>
              <div className="font-heading text-24 2xl:text-40 text-primaryDark leading-12">
                {project.name}
              </div>
            </div>

            <div className="icons flex gap-2 absolute top-0 right-0">
              <Hint icon={<img src={Award} alt={''} />}>
                <span className={'font-bold text-primary'}>Promoted</span>
              </Hint>
              <Hint icon={<img src={Shield} alt={''} />}>
                <span className={'font-bold text-primary'}>Audited</span>
              </Hint>
              {/*<Hint icon={<img src={Notification} alt={''} />}>Promoted</Hint>*/}
            </div>
          </div>
        </div>

        <div className="block__item">
          <div className="flex-col 2xl:flex-row flex gap-3 w-full">
            <BaseButton className={'w-full px-1'}>
              <RocketIcon className={'mr-1'} />
              Apply now
            </BaseButton>
            <Link href={`/project/${project.id}/quests`}>
              <a className="cursor-pointer w-full">
                <BaseButton className={'w-full px-4 whitespace-nowrap'}>
                  <BoltIcon className={'mr-1'} />
                  Booster quests
                </BaseButton>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="block__item">
          <div className="title--small">Links</div>
        </div>

        <div className="block--contrast">
          <div className="title--small">Pitch</div>
          <p className="text-primaryClear">{project?.description}</p>
        </div>

        <div className="block__item">
          <div className="title--small">Admission</div>
          <p className="text-primaryClear">
            Have locked ASTR tokens 5 transactions on Uniswap in the last 6 month Have at least 2500$
            of tokens on your wallet
          </p>
        </div>

        <div className="block--contrast">
          <div className="title--small mb-5">IDO Information</div>

          <div className="flex justify-between mb-4">
            <div className="text-primaryClear">Hardcap</div>
            <div className="font-heading text-primary text-right">${project?.totalRaise}</div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="text-primaryClear">Token price</div>
            <div className="font-heading text-primary text-right">${project?.maxAllocation}</div>
            {
              // TODO get value
            }
          </div>

          <div className="flex justify-between mb-4">
            <div className="text-primaryClear">Max. Allocation</div>
            <div className="font-heading text-primary text-right">${project?.maxAllocation}</div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="text-primaryClear">Type</div>
            <div className="font-heading text-primary text-right">{project?.type}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-primaryClear">Blockchain</div>
            <div className="font-heading text-primary text-right">Ethereum - L2: StarkNet</div>
            {
              // TODO get value
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfos
