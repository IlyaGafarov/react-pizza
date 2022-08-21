import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice'

const list = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
]

const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.filter.sort)

  const [open, setOpen] = React.useState(false)

  function onClickListItem(obj) {
    dispatch(setSort(obj))
    setOpen(false)
  }

  return (
    <div className="sort">
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
