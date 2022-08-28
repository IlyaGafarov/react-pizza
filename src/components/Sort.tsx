import React from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../redux/filter/slice'
import { Sort, sortPropertyEnum } from '../redux/filter/types'

type SortItem = {
  name: string
  sortProperty: sortPropertyEnum
}

type SortPopupProps = {
  value: Sort
}

export const list: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: sortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: sortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: sortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: sortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: sortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: sortPropertyEnum.TITLE_ASC },
]

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const sortRef = React.useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  function onClickListItem(obj: SortItem) {
    dispatch(setSort(obj))
    setOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
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
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})

export default SortPopup
