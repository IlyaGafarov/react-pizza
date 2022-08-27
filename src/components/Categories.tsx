import React from 'react'

const categories = ['все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  value: number
  onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
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
})

export default Categories
