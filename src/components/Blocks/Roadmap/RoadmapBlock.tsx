import RoadmapItem from './RoadmapItem'
import { BoltIcon } from '../../ui/Icons/Icons'
import SandWatch from 'assets/icons/currentColor/Sand-watch.svg?inline'

const RoadmapBlock = () => {
  return (
    <div className="ui-page-block" id="roadmap">
      <div className="g-container">
        <h2 className="t-block-title ui-t-dark">Roadmap</h2>

        <div className="ml-10">
          <RoadmapItem date="Q2 2022" title="Launch">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="block-no-bg text-white p-8 font-bold flex flex-col bg-primary border-primary ui-glow-text 2xl:min-w-[448px] hover">
                <h4 className="title ui-small-title text-white">
                  <div className="icon mr-1">
                    <BoltIcon />
                  </div>
                  Ongoing
                </h4>

                <ul className="mt-auto list-disc ml-3">
                  <li>Beta testing;</li>
                  <li> Community incentives;</li>
                  <li>Partnerships announcements.</li>
                </ul>
              </div>

              <div className="block p-8 2xl:min-w-[300px] font-bold hover group">
                <h4 className="title ui-small-title mb-4 ui-t-primary">
                  <div className="icon mr-1">
                    <BoltIcon />
                  </div>
                  Ongoing
                </h4>

                <ul className="mt-auto list-disc ml-3 group-hover:ui-t-primary transition">
                  <li>Seed round;</li>
                  <li>Private sale;</li>
                  <li>Website reveal ;</li>
                  <li>Public sale.</li>
                </ul>
              </div>
            </div>
          </RoadmapItem>

          <RoadmapItem date="Q3 2022" title="First IDOs">
            <div className="block p-8 hover group">
              <h4 className="title">
                <div className="icon mr-1">
                  <SandWatch />
                </div>
                Not started
              </h4>

              <ul className="group-hover:ui-t-primary transition">
                <li>Audit ;</li>
                <li>Staking ;</li>
                <li>First IDOs ;</li>
                <li>Vault strategy V1 ;</li>
                <li>Developer support (libraries, SDK...);</li>
                <li>On-chain profiling system V1.</li>
              </ul>
            </div>
          </RoadmapItem>

          <RoadmapItem date="Q4 2022" title="Governance">
            <div className="block p-8 hover group">
              <h4 className="title">
                <div className="icon mr-1">
                  <SandWatch />
                </div>
                Not started
              </h4>

              <ul className="group-hover:ui-t-primary transition">
                <li>Launch of the $ASTR token;</li>
                <li>Release of the full features of Astraly;</li>
                <li>Launch of the soulbound token issuing platform;</li>
                <li>Deeper integration with other projects.</li>
              </ul>
            </div>
          </RoadmapItem>

          <RoadmapItem date="2023" title="Astraly 2.0">
            <div className="block p-8 hover group">
              <h4 className="title">
                <div className="icon mr-1">
                  <SandWatch />
                </div>
                Not started
              </h4>

              <ul className="group-hover:ui-t-primary transition">
                <li>Mobile App;</li>
                <li>Fees redistribution;</li>
                <li>Cross-rollups deployment;</li>
                <li>Off-chain data integration;</li>
                <li>Profiling system V2.</li>
              </ul>
            </div>
          </RoadmapItem>
        </div>
      </div>
    </div>
  )
}

export default RoadmapBlock
