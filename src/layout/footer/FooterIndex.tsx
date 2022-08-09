import FooterCTA from './FooterCTA'
import FooterCol, { FooterLink } from './FooterCol'
import TwitterIcon from '../../assets/icons/currentColor/Twitter.svg?inline'
import {
  DiscordLink,
  DocsLink,
  GitHubLink,
  TelegramLink,
  TwitterLink,
  WhitepaperLink,
} from '../../constants'
import GithubIcon from '../../assets/icons/currentColor/Github.svg?inline'
import TelegramIcon from '../../assets/icons/currentColor/Telegram.svg?inline'
import { format } from 'date-fns'
import StarkNetLogo from '../../assets/images/Starknet-logo-dark1.svg'
import React from 'react'
import BaseButton from '../../components/ui/buttons/BaseButton'
import ShoppingCart from 'assets/icons/currentColor/Shopping-cart.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import Link from 'next/link'
import Logo from '../../assets/images/logo.svg'
import LogoOutline from 'assets/icons/currentColor/Logo--outline.svg?inline'
import UniversityOutline from 'assets/icons/currentColor/University--outiline.svg?inline'
import HeartOutline from 'assets/icons/currentColor/Heart--outline.svg?inline'
import Horizontal from '../../components/ui/Separator/Horizontal'

const Links = [
  [<TwitterIcon key="1" />, 'Twitter', TwitterLink],
  [<TelegramIcon key="2" />, 'Telegram', TelegramLink],
  [<GithubIcon key="3" />, 'Github', GitHubLink],
]

const Item = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => {
  return (
    <Link href={href}>
      <a target="__blank">
        <div className="flex items-center ui-t-primaryClear cursor-pointer">
          <div className="icon mr-2 transform -translate-y-0.5">{icon}</div>

          <div className="text">{label}</div>
        </div>
      </a>
    </Link>
  )
}

const FooterIndex = () => {
  const year = format(new Date(), 'yyyy')
  return (
    <footer className="FooterIndex ui-page-block">
      <FooterCTA />

      <div className="g-container pt-24">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 justify-center gap-y-10 text-center md:text-left">
          <div className="logo md:col-span-4 lg:col-span-1 flex justify-center lg:block">
            <Link href="/">
              <div className="logo flex items-center cursor-pointer">
                <img src={Logo} height="54" width="54" alt="Astraly logo" />
              </div>
            </Link>
          </div>
          <FooterCol title="Astraly" icon={<LogoOutline />}>
            <FooterLink href={'/'}>Homepage</FooterLink>
            <FooterLink href={'/buy'}>Buy</FooterLink>
            <FooterLink href={'/stake'}>Lock</FooterLink>
          </FooterCol>
          <FooterCol title="Learn" icon={<UniversityOutline />}>
            <FooterLink href={'/'}>Overview</FooterLink>
            <FooterLink href={'/buy'}>$ASTR Token</FooterLink>
            {/* <FooterLink href={'/stake'}>Docs</FooterLink> */}
            <FooterLink href={'https://wp.astraly.xyz/'}>Whitepaper</FooterLink>
          </FooterCol>
          <FooterCol title="Community" icon={<HeartOutline />}>
            <FooterLink href={'https://github.com/Astraly-Labs'}>Github</FooterLink>
            <FooterLink href={'/'}>Forum</FooterLink>
            <FooterLink href={'/'}>Crew3</FooterLink>
          </FooterCol>
          <div className="buy">
            <div className="flex items-center justify-center mb-6">
              <div className="text-16 text-primaryClear leading-138 pt-0.5 whitespace-nowrap">
                Powered by
              </div>
              <img src={StarkNetLogo} alt={'StarkNet Logo'} className={'ml-2'} />
            </div>

            <Link href={'/buy'}>
              <div>
                <BaseButton
                  className={'px-3 lg:px-12 group whitespace-nowrap w-auto'}
                  medium={true}>
                  <ShoppingCart className={'mr-3'} />
                  Buy $ASTR
                  <Chevron className={'ml-3 icon-right'} />
                </BaseButton>
              </div>
            </Link>
          </div>
        </div>

        <div className="separator mt-20">
          <Horizontal />
        </div>

        <div className="footer py-8 flex items-center flex-col md:flex-row gap-y-10">
          <div className="theme-switcher"></div>
          <div className="copyright md:mr-auto">© {year} Astraly Labs, Inc.</div>

          <div className="social flex gap-8 md:gap-14 flex-wrap">
            {Links.map(([icon, label, href]) => (
              <Item
                icon={icon}
                label={label as string}
                href={href as string}
                key={label as string}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterIndex
