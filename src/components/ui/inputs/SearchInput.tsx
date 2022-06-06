import styles from './Search.module.scss'
import { useRef, useState } from 'react'
import SearchIcon from 'assets/icons/currentColor/Search.svg?inline'

const SearchInput = () => {
  const [hasFocus, setFocus] = useState(false)
  const input = useRef<HTMLInputElement | undefined>()

  return (
    <div
      className={`${styles.search} ${hasFocus && styles.searchActive}`}
      onClick={() => {
        !hasFocus && input.current?.focus()
      }}>
      <div className="icon mr-3">
        <SearchIcon />
      </div>
      <div className="text font-heading">Search</div>
      <div className="input">
        <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} ref={input} />
      </div>
    </div>
  )
}

export default SearchInput
