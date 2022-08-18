import React from 'react'

const categories = ['все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const Categories = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={i === value ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
