import styles from './FloatingMenu.module.scss'
import FloatingMenuItem from './FloatingMenuItem'
import classNames from 'classnames'
import CarretIcon from 'assets/icons/currentColor/Caret-up.svg?inline'
import GlobeIcon from 'assets/icons/currentColor/Globe.svg?inline'
import GraphIcon from 'assets/icons/currentColor/Pulse.svg?inline'
import BookIcon from 'assets/icons/currentColor/Book-open.svg?inline'
import LogoIcon from 'assets/icons/currentColor/LogoA.svg?inline'

const FloatingMenu = () => {
  return (
    <div className={classNames(styles.FloatingMenu, 'flex flex-col gap-2')} id="network_">
      <FloatingMenuItem text={'Top'} href={'body'}>
        <CarretIcon />
      </FloatingMenuItem>
      <FloatingMenuItem text={'Roadmap'} href={'#roadmap'}>
        <GlobeIcon />
      </FloatingMenuItem>
      <FloatingMenuItem text={'Network Stats'} href={'#network'}>
        <GraphIcon />
      </FloatingMenuItem>
      <FloatingMenuItem text={'FAQ'} href={'#faq'}>
        <BookIcon />
      </FloatingMenuItem>
      <FloatingMenuItem text={'The Astraly'} href={'#team'}>
        <LogoIcon />
      </FloatingMenuItem>
    </div>
  )
}

export default FloatingMenu
