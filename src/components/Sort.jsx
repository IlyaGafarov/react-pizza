import React from 'react'

const Sort = ({ value, onChangeSort }) => {
  const list = [
    { name: 'популярности (DESC)', sortProperty: 'rating' },
    { name: 'популярности (ASC)', sortProperty: '-rating' },
    { name: 'цене (DESC)', sortProperty: 'price' },
    { name: 'цене (ASC)', sortProperty: '-price' },
    { name: 'алфавиту (DESC)', sortProperty: 'title' },
    { name: 'алфавиту (ASC)', sortProperty: '-title' },
  ]

  const [open, setOpen] = React.useState(false)

  function onClickListItem(i) {
    onChangeSort(i)
    setOpen(false)
  }

  return (
    <div className="sort">
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
}

export default Sort
