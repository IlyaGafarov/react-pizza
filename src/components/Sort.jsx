import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice'

export const list = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
]

const Sort = () => {
  const sortRef = React.useRef()

  const dispatch = useDispatch()
  const sort = useSelector((state) => state.filter.sort)

  const [open, setOpen] = React.useState(false)

  function onClickListItem(obj) {
    dispatch(setSort(obj))
    setOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировать по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
