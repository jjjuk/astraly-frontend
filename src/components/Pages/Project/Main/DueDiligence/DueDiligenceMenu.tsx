import BaseButton from 'components/ui/buttons/BaseButton'
import { Project } from 'interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import VueScrollTo from 'vue-scrollto'
import ProjectLinks from '../ProjectLinks'

const DueDiligenceMenu: React.FC<{ current: string; project: Project }> = ({
  current,
  project,
}) => {
  const router = useRouter()

  const goTo = (anchor: string) => {
    VueScrollTo.scrollTo(document.querySelector(`#${anchor}`), 200, {
      offset: -200,
    })
  }
  const getClasses = (anchor: string) => {
    return `item ${
      current === anchor ? 'ui-t-primary' : 'ui-t-primaryClear'
    } font-sans font-bold mb-8 cursor-pointer`
  }
  return (
    <div className="block--highlight w-72 top-36 left-0 sticky">
      <div className={getClasses('Highlights')} onClick={() => goTo('Highlights')}>
        Highlights
      </div>
      <div className={getClasses('Summary')} onClick={() => goTo('Summary')}>
        Summary
      </div>
      <div className={getClasses('Problem')} onClick={() => goTo('Problem')}>
        Problem
      </div>
      <div className={getClasses('Solution')} onClick={() => goTo('Solution')}>
        Solution
      </div>
      <div className={getClasses('Roadmap')} onClick={() => goTo('Roadmap')}>
        Roadmap
      </div>
      <div className={getClasses('Team')} onClick={() => goTo('Team')}>
        Team
      </div>
      <div className="pt-8"></div>
      {!!project.links?.length && (
        <>
          <p className="text-whitePurple text-12 font-bold">Links</p>
          <ProjectLinks project={project} />
        </>
      )}
      <Link href={`/project/${project.idoId}/participate`}>
        <BaseButton>Participate Now!</BaseButton>
      </Link>
    </div>
  )
}

export default DueDiligenceMenu
