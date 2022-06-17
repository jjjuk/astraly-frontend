import { Project } from '../../../../../interfaces'
import DueDiligenceMenu from './DueDiligenceMenu'
import BaseButton from '../../../../ui/buttons/BaseButton'
import { PropsWithChildren } from 'react'
import styles from './dueDiligence.module.scss'
import Star from 'assets/images/star--current.svg?inline'

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
  const steps = ['Buy astr tokens', 'Stake ASTR tokens', 'Claim lottery tickets', 'Invest in IDOs']
  const Step = ({ children, index }: PropsWithChildren<{ index: number }>) => {
    return (
      <div className="text-primaryClear text-16">
        <div className="">Step {index + 1}</div>
        <div className="font-bold">{children}</div>
      </div>
    )
  }

  return (
    <div className="DueDiligence block p-8 mb-10">
      <div className="lg:flex gap-16">
        <div className="hidden lg:block">
          <DueDiligenceMenu />
        </div>

        <div className={`${styles.dueDiligence} lg:pr-40`}>
          <h3>1. Due Diligence</h3>
          <p className="mb-6">
            For each project featured on Astraly, we create a Due Diligence report with our team of
            internal experts and advisors. You can read the full document here:
          </p>
          <BaseButton inline={true} className={'px-6'}>
            Read the report
          </BaseButton>

          <Separator />

          <h3>2. Summary</h3>
          <p>
            This project is a placeholder. Once Astraly is live on mainnet, you’ll be able to
            discover and invest in real projects building on StarkNet.
          </p>

          <Separator />

          <h3>3. Problem</h3>
          <p>
            Mauris elit metus, rutrum eu malesuada ac, interdum a ex. Suspendisse quis ullamcorper
            nibh, sit amet cursus arcu. Duis faucibus risus nec rhoncus varius. Cras nec vulputate
            purus. Maecenas eu metus efficitur, placerat elit ut, tincidunt justo. Phasellus tempus
            ultrices eros. Maecenas elementum ligula eu elit gravida porta. Mauris quis lacus a
            velit ultrices hendrerit vitae vitae tellus.
          </p>

          <Separator />

          <h3>4. Solution</h3>
          <p>
            Ut pretium tincidunt finibus. Ut dignissim dui orci, quis sodales augue viverra vel.
            Donec fringilla ligula nec justo posuere, at posuere ex luctus. Pellentesque eu congue
            tellus, sit amet consectetur neque. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Nulla tristique neque ut tincidunt tempor. In eleifend est dui. Praesent at
            tellus maximus, pellentesque turpis vitae, tincidunt neque. Sed euismod porta leo, nec
            elementum sem cursus nec. Donec tempor mauris sed maximus venenatis. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Vivamus eu augue sed est tristique
            eleifend sed at risus. Fusce fermentum arcu nec scelerisque gravida. Mauris ornare
            molestie nisi, a varius mauris placerat nec. Vestibulum sit amet molestie ligula, eu
            tempor sem.
          </p>

          <Separator />

          {/*<h3>5. Roadmap</h3>*/}
          {/*<p>*/}
          {/*  For each project featured on Astraly, we create a Due Diligence report with our team of*/}
          {/*  internal experts and advisors. You can read the full document here:*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  )
}

export default DueDiligence
