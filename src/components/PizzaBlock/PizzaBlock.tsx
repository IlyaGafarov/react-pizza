import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, CartItem, selectCartItemById } from '../../redux/slices/cartSlice'

const typeNames = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

  function onClickAdd() {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

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
        <button onClick={onClickAdd} className="button button--outline button--add">
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
