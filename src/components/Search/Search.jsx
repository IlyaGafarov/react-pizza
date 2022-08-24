import React from 'react'
import debounce from 'lodash.debounce'
import cl from './Search.module.scss'

import pizzaSearch from '../../assets/img/pizza-search.svg'
import clearSearch from '../../assets/img/clear-search.svg'

import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef()

  function onClickClear() {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 500),
    [],
  )

  function onChangeInput(event) {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={cl.root}>
      <img className={cl.icon} src={pizzaSearch} alt="" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={cl.input}
        type="text"
        placeholder="Найти пиццу"
      />

      {value && <img onClick={onClickClear} className={cl.clearSearch} src={clearSearch} alt="" />}
    </div>
  )
}

export default Search
