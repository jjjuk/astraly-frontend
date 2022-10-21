import Star from 'assets/images/star--current.svg?inline'

const Horizontal = () => {
  return (
    <div className="Horizontal flex w-full gap-4 items-center ui-t-primaryClear relative z-10">
      <div className="line flex-grow h-0.5 bg-white dark:bg-gray3 rounded-full"></div>
      <Star />
      <div className="line flex-grow h-0.5 bg-white dark:bg-gray3 rounded-full"></div>
    </div>
  )
}

export default Horizontal
