import { NextPage } from 'next'
import Layout from '../layout'
import ProjectsSlider from '../components/ui/Slider/ProjectsSlider'
import Container from '../components/ui/Container'

const launchpad: NextPage = () => {
  return (
    <div className="launchpad">
      <Container>
        <h1 className="text-54 font-heading uppercase mb-16 text-primaryDark">Launchpad</h1>

        <h2 className="text-24 text-primaryClear font-heading mb-6">ONGOING PROJETCS</h2>
      </Container>

      <ProjectsSlider />

      <Container>
        <h2 className="text-24 text-primaryClear font-heading mb-6">FINISHED LAUNCHPADS</h2>
      </Container>
      <ProjectsSlider />
    </div>
  )
}

export default launchpad
