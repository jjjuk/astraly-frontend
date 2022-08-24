import TeamMember from './TeamMember'
import Shield from 'assets/icons/currentColor/Shield.svg?inline'

const team = [
  {
    title: 'CEO',
    name: 'Mattéo Georges',
    twitter: 'Starkneth',
    image: require('./images/mateo.png').default.src,
  },
  {
    title: 'CTO',
    name: 'Matthias Hallgren',
    twitter: '0xevolve',
    image: require('./images/mathias.png').default.src,
  },
  {
    title: 'CMO',
    name: 'Nicolas Vrillac',
    twitter: 'Nikron_eth',
    image: require('./images/nicolas.png').default.src,
  },
  {
    title: 'CAIRO DEVELOPER',
    name: 'Filip Laurentiu',
    twitter: 'Filiplaurentiu',
    image: require('./images/filip.png').default.src,
  },
  {
    title: 'PRODUCT MANAGER',
    name: 'William Finger',
    twitter: 'Fiwill',
    image: require('./images/william.png').default.src,
  },
]

const advisors = [
  {
    title: 'CMO',
    name: 'Nicolas Vrillac',
    twitter: 'Nikron_eth',
    image: require('./images/nicolas.png').default.src,
  },
  {
    title: 'CAIRO DEVELOPER',
    name: 'Filip Laurentiu',
    twitter: 'Filiplaurentiu',
    image: require('./images/filip.png').default.src,
  },
]
const TeamBlock = () => {
  return (
    <div className="ui-page-block" id="team">
      <div className="g-container">
        <h2 className="t-block-title ui-t-dark">Team</h2>
        <div className="ml-10">
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14 mb-14">
            {team.map((x, i) => (
              <TeamMember {...x} key={i} />
            ))}
          </div>

          <div className="block px-8 pt-6 pb-4 mb-20 bg-whitePurple max-w-[988px]">
            <div className="flex">
              <div className="icon mr-4 -mt-2">
                <Shield />
              </div>
              <div className="content">
                <div className="title font-heading font-bold uppercase mb-3">
                  Astraly offers more than a safe platform for your IDO.
                </div>
                <div className="font-bold leading-15">
                  The goal of the Astraly accelerator is to provide founders with strategic and
                  operational support including co-marketing on Twitter/Discord, partnership and
                  ecosystem intros, access to a database of vetted talents including Cairo
                  developers, UX/UI designers and marketers.
                </div>
              </div>
            </div>
          </div>

          {/* <h3 className="h3 ui-t-dark font-heading text-24 mb-1">Advisors</h3>
          <p className="font-bold mb-14">With expert advisors around.</p>

          <div className="grid lg:grid-cols-2 gap-16">
            {advisors.map((x, i) => (
              <TeamMember {...x} key={i} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default TeamBlock
