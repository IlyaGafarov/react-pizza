import React from 'react'
import { Link } from 'react-router-dom'
import cl from './PizzaBlock.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'
import { selectCartItemById } from '../../redux/cart/selectors'

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
    <div className={cl.block}>
      <Link to={`/pizza/${id}`}>
        <img className={cl.image} src={imageUrl} alt="тут Пицца :)" />
        <h4 className={cl.title}>{title}</h4>
      </Link>

      <div className={cl.selector}>
        <ul className={cl.list}>
          {types.map((typeId, i) => (
            <li
              key={i}
              onClick={() => setActiveType(i)}
              className={activeType === i ? `${cl.active}` : ''}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>

        <ul className={cl.list}>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? `${cl.active}` : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className={cl.footer}>
        <div className={cl.price}>от {price} ₽</div>
        <button onClick={onClickAdd} className={cl.btn}>
          Добавить
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
