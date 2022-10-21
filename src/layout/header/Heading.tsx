import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import HomeHeading from 'components/Pages/Home/HomeHeading'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Heading = () => {
  const { heading } = useSelector((state: RootState) => state.Ui)

  return (
    <>
      {/* <TransitionGroup className=""> */}
      {heading.isHome && (
        // <CSSTransition key={'home'} timeout={300} classNames="home-heading__animation">
        <HomeHeading />
        // </CSSTransition>
      )}
      {/*{!heading.isHome && !heading.isProject && (*/}
      {/*  <CSSTransition key={heading.page} timeout={300}>*/}
      {/*    <h1>{heading.title} x</h1>*/}
      {/*  </CSSTransition>*/}
      {/*)}*/}
      {/* </TransitionGroup> */}
    </>
  )
}

export default Heading
