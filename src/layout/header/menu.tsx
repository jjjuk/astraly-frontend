import { PropsWithChildren, ReactComponentElement, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './menu.module.scss'

const MenuItem = ({
  children,
  link,
}: PropsWithChildren<{
  link: {
    text: string
    href: string
    iconOutline: any
    iconSolid: any
  }
}>) => {
  const router = useRouter()
  const [isCurrentRoute, setIsCurrentRoute] = useState(false)

  useEffect(() => {
    setIsCurrentRoute(
      router.route === link.href ||
        (router.route.startsWith('/project') && link.href === '/launchpad')
    )
  }, [router.route])

  return (
    <Link href={link.href}>
      <div
        className={`${styles.menuItem} ${isCurrentRoute && styles.menuItemActive} cursor-pointer`}>
        <div className={`${styles.icon} relative`}>
          <div className={`${styles.iconSolid} absolute top-0 left-0 h-full w-full`}>
            {link.iconSolid}
          </div>
          <div className={styles.iconOutline}>{link.iconOutline}</div>
        </div>
        <span className={'hidden lg:inline'}>{children}</span>
      </div>
    </Link>
  )
}

import Star from 'assets/images/star.svg'
import Home from 'assets/icons/outline/Home.svg?inline'
import HomeFull from 'assets/icons/solid/Home.svg?inline'

import Launchpad from 'assets/icons/outline/Rocket.svg?inline'
import LaunchpadFull from 'assets/icons/solid/Rocket.svg?inline'

import Lock from 'assets/icons/outline/Unlock.svg?inline'
import LockFull from 'assets/icons/solid/Lock.svg?inline'

import Buy from 'assets/icons/outline/Shopping-cart.svg?inline'
import BuyFull from 'assets/icons/solid/Shopping-cart.svg?inline'

const Links = [
  {
    text: 'Home',
    iconOutline: <Home />,
    iconSolid: <HomeFull />,
    href: '/',
  },
  {
    text: 'Launchpad',
    iconOutline: <Launchpad />,
    iconSolid: <LaunchpadFull />,
    href: '/launchpad',
  },
  {
    text: 'Lock',
    iconOutline: <Lock />,
    iconSolid: <LockFull />,
    href: '/stake',
  },
  {
    text: 'Buy $ZKP',
    iconOutline: <Buy />,
    iconSolid: <BuyFull />,
    href: '/buy',
  },
]

const HeaderMenu = () => {
  const router = useRouter()
  const container = useRef<HTMLDivElement>(null)
  const [underlineStyle, setUnderLineStyle] = useState({
    transform: 'translateX(0)',
    width: '20px',
  })

  const redrawUnderline = () => {
    if (!container.current) {
      return
    }
    let activeIndex = Links.findIndex(
      (x) =>
        x.href === router.route || (router.route.startsWith('/project') && x.href === '/launchpad')
    )

    if (activeIndex == -1) {
      activeIndex = 0
    }

    const element = container.current.querySelector(
      `.${styles.menuItem}:nth-child(${activeIndex + 1})`
    )

    if (!element) {
      return
    }

    const isFirst = activeIndex === 0
    const isLast = activeIndex === Links.length - 1

    setUnderLineStyle({
      width: `${element.offsetWidth - (isFirst || isLast ? 22 : 46)}px`,
      transform: `translateX(${element.offsetLeft + (isFirst ? 2 : 24)}px)`,
    })
  }

  useEffect(() => {
    redrawUnderline()
  }, [router.route, container.current])
  return (
    <div
      className={`headerMenu flex text-20 leading-6 text-primaryClear ${styles.menu}`}
      ref={container}>
      {Links.map((x) => (
        <MenuItem link={x} key={x.href}>
          {x.text}
        </MenuItem>
      ))}

      <div className={styles.underline} style={underlineStyle}>
        <img src={Star} alt={''} />
      </div>
    </div>
  )
}

export default HeaderMenu
