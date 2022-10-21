import React, { ReactNode } from 'react'

import { Project } from 'interfaces'

import Link from 'next/link'

import TwitterIcon from 'assets/icons/currentColor/Twitter.svg?inline'
import DiscordIcon from 'assets/icons/currentColor/Discord.svg?inline'
import SiteIcon from 'assets/icons/currentColor/Explore.svg?inline'
import { HexagonWrapped } from '../../../ui/Hexagon/HexagonWrapped'

const ProjectLinks: React.FC<{ project: Project }> = ({ project }) => {
  const linksByKey = project.links?.reduce((acc, x) => {
    // @ts-ignore
    acc[x.key] = x.value
    return acc
  }, {} as any)
  return (
    <div className="flex gap-2">
      {Object.entries<string>(linksByKey).map(([key, link]) => {
        const icon =
          key === 'twitter' ? (
            <TwitterIcon />
          ) : key === 'discord' ? (
            <DiscordIcon />
          ) : (
            <SiteIcon width="28" height="28" viewBox="0 0 24 24" />
          )
        return (
          <Link href={link}>
            <a target="_blank" className="hover:scale-110 transition transform">
              <HexagonWrapped>{icon}</HexagonWrapped>
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default ProjectLinks
