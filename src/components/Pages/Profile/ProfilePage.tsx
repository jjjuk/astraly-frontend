import Vertical from '../../ui/Separator/Vertical'
import InvestmentOverview from '../../ui/Investment/InvestmentOverview'
import ProjectsSlider from '../../ui/Slider/ProjectsSlider'
import ProfileCover from './ProfileCover'
import VerifyAccount from './VerifyAccount'
import AccountLinks from './AccountLinks'
import Planets from 'assets/animations/planet.svg?inline'

const ProfilePage = () => {
  return (
    <>
      <div className="ProfilePage g-container mb-10">
        <div className="page-title mb-14">Profile</div>
        <Planets className={'lightning_svg absolute right-40 top-20 -z-10'} />
        <div className="lg:flex gap-6 mb-10">
          <div className="w-full">
            <ProfileCover />
            <InvestmentOverview />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6 left-0">
              <Vertical />
            </div>
          </div>

          <div className={'mt-4 lg:mt-0 lg:w-1/3 flex-shrink-0'}>
            <VerifyAccount />

            <AccountLinks />
          </div>
        </div>
      </div>
      <div className="g-container">
        <div className="font-heading uppercase mb-6 text-primaryClear text-24">
          INVESTED PROJECTS
        </div>
      </div>

      <ProjectsSlider />
      <div className="h-20"></div>
    </>
  )
}

export default ProfilePage
