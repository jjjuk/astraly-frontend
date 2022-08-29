import React from 'react'

import { Project } from 'interfaces'

import Link from 'next/link'
import ProjectLogo from 'components/ui/ProjectLogo'
import BaseButton from 'components/ui/buttons/BaseButton'
import { BoltIcon, RocketIcon } from 'components/ui/Icons/Icons'
import Hint from 'components/ui/Hint/Hint'

import Award from 'assets/icons/solid/Award.svg'
import Shield from 'assets/icons/solid/Shield.svg'
import Hexagon from '../../../ui/Hexagon'
import TwitterIcon from 'assets/icons/currentColor/Twitter.svg?inline'
import DiscordIcon from 'assets/icons/currentColor/Discord.svg?inline'
import SiteIcon from 'assets/icons/currentColor/Explore.svg?inline'

const ProjectInfos: React.FC<{ project: Project }> = ({ project }) => {
  const linksByKey = project.links?.reduce((acc, x) => {
    // @ts-ignore
    acc[x.key] = x.value
    return acc
  }, {} as any)
  return (
    <div className="ProjectInfos sticky top-6 left-0">
      <div className="block mb-4">
        <div className="block--contrast py-3">
          <div className="flex items-center relative">
            <div className="logo">
              <ProjectLogo project={project} />
            </div>
            <div className="info ml-4">
              <div className="text-16 ui-t-primaryClear font-bold">Apply and invest in</div>
              <div className="font-heading text-24 2xl:text-40 ui-t-dark leading-12">
                {project.name}
              </div>
            </div>

            <div className="icons flex gap-2 absolute top-0 right-0">
              <Hint icon={<img src={Award} alt="" />}>
                <span className="font-bold ui-t-primary">Promoted</span>
              </Hint>
              <Hint icon={<img src={Shield} alt="" />}>
                <span className="font-bold ui-t-primary">Audited</span>
              </Hint>
              {/*<Hint icon={<img src={Notification} alt={''} />}>Promoted</Hint>*/}
            </div>
          </div>
        </div>

        <div className="block__item">
          <div className="flex-col 2xl:flex-row flex gap-3 w-full">
            <Link
              href={
                project.currentRoundIndex === -1 || project.currentRoundIndex === 1
                  ? '/'
                  : `/project/${project.idoId}/quests`
              }>
              <a className="cursor-pointer w-full">
                <BaseButton
                  className="w-full px-4 whitespace-nowrap"
                  disabled={project.currentRoundIndex === -1 || project.currentRoundIndex === 1}>
                  <BoltIcon className="mr-1" />
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
          <div className="flex gap-2">
            {linksByKey['site'] && (
              <Link href={linksByKey['site']}>
                <a target="_blank" className="hover:scale-110 transition transform">
                  <Hexagon>
                    <SiteIcon width="28" height="28" viewBox="0 0 24 24" />
                  </Hexagon>
                </a>
              </Link>
            )}

            {linksByKey.twitter && (
              <Link href={linksByKey.twitter}>
                <a target="_blank" className="hover:scale-110 transition transform">
                  <Hexagon>
                    <TwitterIcon />
                  </Hexagon>
                </a>
              </Link>
            )}

            {linksByKey.discord && (
              <Link href={linksByKey.discord}>
                <a target="_blank" className="hover:scale-110 transition transform">
                  <Hexagon>
                    <DiscordIcon />
                  </Hexagon>
                </a>
              </Link>
            )}
          </div>
        </div>

        <div className="block--contrast">
          <div className="title--small">Pitch</div>
          <p className="ui-t-primaryClear">{project.description}</p>
        </div>

        <div className="block__item">
          <div className="title--small">Admission</div>
          <p className="ui-t-primaryClear">
            <ol>
              <li>{project.admission}</li>
            </ol>
          </p>
        </div>

        <div className="block--contrast">
          <div className="title--small mb-5">IDO Resume</div>

          <div className="flex justify-between mb-4">
            <div className="ui-t-primaryClear font-bold">Hardcap</div>
            <div className="font-heading text-primary text-right">ETH {project.totalRaise}</div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="ui-t-primaryClear font-bold">Token price</div>
            <div className="font-heading text-primary text-right">ETH {project.tokenPrice}</div>
            {
              // TODO get value
            }
          </div>

          <div className="flex justify-between mb-4">
            <div className="ui-t-primaryClear font-bold">Max. Allocation</div>
            <div className="font-heading text-primary text-right">ETH {project.maxAllocation}</div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="ui-t-primaryClear font-bold">Type</div>
            <div className="font-heading text-primary text-right">{project.type}</div>
          </div>

          <div className="flex justify-between">
            <div className="ui-t-primaryClear font-bold">Blockchain</div>
            <div className="font-heading text-primary text-right">StarkNet</div>
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
