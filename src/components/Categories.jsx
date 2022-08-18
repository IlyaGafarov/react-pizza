import React from 'react'

const categories = ['все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => setActiveIndex(i)}
            className={i === activeIndex ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
