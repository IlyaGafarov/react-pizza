import React from 'react'

const Sort = () => {
  const list = ['популярности', 'цене', 'алфавиту']

  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(0)

  const sortName = list[selected]

  function onClickListItem(i) {
    setSelected(i)
    setOpen(false)
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировать по:</b>
        <span onClick={() => setOpen(!open)}>{sortName}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((name, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(i)}
                className={selected === i ? 'active' : ''}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
