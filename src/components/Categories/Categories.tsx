import React from 'react'
import cl from './Categories.module.scss'

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  value: number
  onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <>
      <ul className={cl.categories}>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={i === value ? `${cl.active}` : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </>
  )
})

export default Categories
