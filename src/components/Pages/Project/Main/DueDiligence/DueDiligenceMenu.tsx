import React, { useEffect } from 'react'
import VueScrollTo from 'vue-scrollto'

const DueDiligenceMenu: React.FC<{ current: string }> = ({ current }) => {
  const goTo = (anchor: string) => {
    VueScrollTo.scrollTo(document.querySelector(`#${anchor}`), 200, {
      offset: -200,
    })
  }
  const getClasses = (anchor: string) => {
    return `item ${
      current === anchor ? 'ui-t-primary' : 'ui-t-primaryClear'
    } font-heading mb-8 cursor-pointer`
  }
  return (
    <div className="block--contrast w-72 top-0 left-0 sticky">
      <div className="pt-8"></div>
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
    </div>
  )
}

export default DueDiligenceMenu
