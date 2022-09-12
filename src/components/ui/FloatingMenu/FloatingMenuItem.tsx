import React from 'react'
import VueScrollTo from 'vue-scrollto'

const FloatingMenuItem: React.FC<{
  text: string
  href: string
}> = ({ text, href, children }) => {
  const scrollTo = () => {
    VueScrollTo.scrollTo(document.querySelector(href), 200)
  }
  return (
    <div
      className={'FloatingMenuItem relative group cursor-pointer hover:text-white text-primary'}
      onClick={scrollTo}>
      <div className="placeholder h-6 w-4 relative z-10 flex items-center justify-center">
        {children}
      </div>
      <div className="content absolute whitespace-nowrap -right-2 top-0 text-12 flex items-center opacity-0 group-hover:opacity-100 bg-primary dark:bg-gray3 border-2 border-transparent dark:border-primary text-white pl-3 h-6 rounded-lg font-bold transition z-0">
        <div className="text mr-4 transform translate-y-[1px]">{text}</div>
        <div className="icon opacity-0">{children}</div>
      </div>
    </div>
  )
}

export default FloatingMenuItem
