/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './Search.module.scss'
import React, { useRef, useState } from 'react'
import SearchIcon from 'assets/icons/currentColor/Search.svg?inline'

const SearchInput = () => {
  const [hasFocus, setFocus] = useState(false)
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div
      className={`${styles.search} ${hasFocus && styles.searchActive}`}
      onClick={() => {
        !hasFocus && inputRef.current?.focus()
      }}>
      <div className={`icon mr-2 ${!hasFocus && '-ml-4'}`}>
        <SearchIcon />
      </div>
      <div className="text font-heading">Search</div>
      <div className="input">
        <input ref={inputRef} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
      </div>
    </div>
  )
}

export default SearchInput
