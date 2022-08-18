import React from 'react'

const PizzaBlock = ({ title, price, imageUrl, sizes, types }) => {
  const typeNames = ['тонкое', 'традиционное']

  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>

      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId, i) => (
            <li
              key={i}
              onClick={() => setActiveType(i)}
              className={activeType === i ? 'active' : ''}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>

        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add">
          <span>Добавить</span>
          <i>0</i>
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
