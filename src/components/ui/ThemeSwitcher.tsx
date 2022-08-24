import Moon from 'assets/icons/solid/Moon.svg'
import Sun from 'assets/icons/solid/Sun.svg'

const ThemeSwitcher = () => {
  const watchTheme = () => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark'
    watchTheme()
  }
  return (
    <div className="ThemeSwitcher">
      <div className="dark:bg-gray3 p-2 bg-white rounded-xl cursor-pointer" onClick={toggleTheme}>
        <img src={Moon} alt={''} className="dark:hidden" />
        <img src={Sun} alt={''} className="hidden dark:inline-block" />
      </div>
    </div>
  )
}

export default ThemeSwitcher
