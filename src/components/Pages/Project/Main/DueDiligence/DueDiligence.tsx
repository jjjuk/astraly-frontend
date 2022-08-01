import { Project } from '../../../../../interfaces'
import DueDiligenceMenu from './DueDiligenceMenu'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styles from './dueDiligence.module.scss'
import Star from 'assets/images/star--current.svg?inline'
import This from './images/this.png'
import Scheme from './images/2.png'
import Team from './images/team.png'
import Investors from './images/investors.png'

const Separator = () => {
  return (
    <>
      <div className="flex my-10">
        <Star className="inline-block transform -translate-y-1 text-primaryClear" />
        <div className="h-1 bg-primaryClearBg rounded-full w-60 ml-10"></div>
      </div>
    </>
  )
}
const DueDiligence = ({ project }: { project: Project }) => {
  const steps = ['Buy ASTR tokens', 'Stake ASTR tokens', 'Claim lottery tickets', 'Invest in IDOs']
  const HighlightsTitle = useRef<HTMLHeadingElement>(null)
  const SummaryTitle = useRef<HTMLHeadingElement>(null)
  const ProblemTitle = useRef<HTMLHeadingElement>(null)
  const SolutionTitle = useRef<HTMLHeadingElement>(null)
  const RoadmapTitle = useRef<HTMLHeadingElement>(null)
  const TeamTitle = useRef<HTMLHeadingElement>(null)
  const [current, setCurrent] = useState('Highlights')

  const Step = ({ children, index }: PropsWithChildren<{ index: number }>) => {
    return (
      <div className="text-primaryClear text-16">
        <div className="">Step {index + 1}</div>
        <div className="font-bold">{children}</div>
      </div>
    )
  }

  useEffect(() => {
    const watchScroll = () => {
      const HighlightsTitleCurrent = HighlightsTitle.current?.getBoundingClientRect().top ?? 0
      const SummaryTitleCurrent = SummaryTitle.current?.getBoundingClientRect().top ?? 0
      const ProblemTitleCurrent = ProblemTitle.current?.getBoundingClientRect().top ?? 0
      const SolutionTitleCurrent = SolutionTitle.current?.getBoundingClientRect().top ?? 0
      const RoadmapTitleCurrent = RoadmapTitle.current?.getBoundingClientRect().top ?? 0
      let current = 'Highlights'

      if (RoadmapTitleCurrent < 0) {
        current = 'Team'
      } else if (SolutionTitleCurrent < 0) {
        current = 'Roadmap'
      } else if (ProblemTitleCurrent < 0) {
        current = 'Solution'
      } else if (SummaryTitleCurrent < 0) {
        current = 'Problem'
      } else if (HighlightsTitleCurrent < 0) {
        current = 'Summary'
      }
      setCurrent(current)
    }
    addEventListener('scroll', watchScroll)
    watchScroll()

    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [])

  return (
    <div className="DueDiligence block p-8 mb-10">
      <div className="lg:flex gap-16">
        <div className="hidden lg:block">
          <DueDiligenceMenu current={current} />
        </div>

        <div className={`${styles.dueDiligence} lg:pr-40`}>
          <h3 id="Highlights" ref={HighlightsTitle}>
            Highlights
          </h3>
          <ul>
            <li>
              briq is a NFT construction protocol built on StarkNet. The project aims to create a
              more fun, composable, interoperable and on-chain future for NFTs.
            </li>
            <li>
              One of the most popular projects on StarkNet with 105K NFTs built and 87K unique
              wallets using briq’s testnet.
            </li>
            <li>
              briqs are the building blocks and utility NFTs of the protocol. They should be
              mintable on mainnet on 09/2022.
            </li>
          </ul>
          <Separator />
          <h3 id="Summary" ref={SummaryTitle}>
            What is briq ?
          </h3>
          <p>
            briq is an NFT crafting and composability system based on fundamental elements called
            briqs. briqs can be combined to create more complex structures called sets.
          </p>
          <img src={This.src} className={styles.dueDiligenceImage} alt={''} />
          <p>
            You can build a set with your briqs, transfer your set to someone, disassemble a set to
            get the briqs back and build something new.
          </p>
          <p>
            Anything built out of briqs is an NFTs. You can think of briq as NFT building blocks.
          </p>
          <Separator />
          <h3 id="Problem" ref={ProblemTitle}>
            How does briq work ?
          </h3>
          <p>
            Assemble your briqs to create structures, color the briqs, assemble the set on the
            blockchain and transfer it to a friend.
          </p>
          <p>
            If you don't like your construction, disassemble it to get the briqs back and build
            something new.
          </p>
          <p>
            Your briqs and everything built out of them is yours. You're free to do what you want.
            We're giving you the means of construction.
          </p>
          <img src={Scheme.src} className={styles.dueDiligenceImage} alt={''} />
          <Separator />
          <h3 id="Solution" ref={SolutionTitle}>
            What’s the vision behind briq ?
          </h3>
          <h4>Making NFTs more composable</h4>
          <p>briqs can be combined to create NFTs called sets.</p>
          <p>Sets can be disassembled to get the briqs back and create something new.</p>
          <p>Sets can be combined to create even more complex structures.</p>
          <p>briqs are NFT matter.</p>
          <h4>Making NFTs more interoperable</h4>
          <p>briqs and sets can be used in any game and can be interpreted as you see fit.</p>
          <p>Build a car and race. Tear it apart and build a plane.</p>
          <p>
            Your NFTs are not stuck in a data silo, they can always be reused for something new.
          </p>
          <p>briqs are NFTs that matter.</p>
          <Separator />
          <h3 id="Roadmap" ref={RoadmapTitle}>
            What are the next steps ?
          </h3>
          <p>The next steps for briq include:</p>
          <ul>
            <li>Mainnet deployment and public sale (09/2022)</li>
            <li>Validium storage for metadata</li>
            <li>
              Developing further integrations with StarkNet’s gaming ecosystem (Realms, Cartridge,
              DopeWars, etc.)
            </li>
            <li>New ways to build (collaborative building)</li>
          </ul>
          <Separator />
          <h3 id="Team" ref={TeamTitle}>
            Who is the team behind briq ?
          </h3>
          <p>
            briq is founded by 2 StarkNet OGs: they were the first developers to launch a project on
            the StarkNet mainnet and won the StarkNet hackathon in Amsterdam in 2022.
          </p>
          <img src={Team.src} className={styles.dueDiligenceImage} alt={''} />
          <Separator />
          <h3>Who are their current backers/partners ?</h3>
          <img src={Investors.src} className={styles.dueDiligenceImage} alt={''} />
        </div>
      </div>
    </div>
  )
}

export default DueDiligence
