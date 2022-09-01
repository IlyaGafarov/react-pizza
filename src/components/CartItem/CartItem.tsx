import React from 'react'
import cl from './CartItem.module.scss'

import minus from '../../assets/img/minus.png'
import plus from '../../assets/img/plus.png'
import clear from '../../assets/img/clear.png'

import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

type CartItemProps = {
  id: string
  title: string
  type: string
  size: number
  price: number
  count: number
  imageUrl: string
}

const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch()

  function onClickPlus() {
    dispatch(
      addItem({
        id,
      } as CartItem),
    )
  }

  function onClickMinus() {
    dispatch(minusItem(id))
  }

  function onClickRemove() {
    if (window.confirm('удалить товар из корзины?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <div className={cl.item}>
      <div className={cl.image}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>

      <div className={cl.information}>
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>

      <div className={cl.count}>
        <button onClick={onClickMinus} disabled={count === 1} className={cl.btnItem}>
          <img src={minus} alt="Удалить" />
        </button>

        <b>{count}</b>

        <button onClick={onClickPlus} className={cl.btnItem}>
          <img src={plus} alt="Добавить" />
        </button>
      </div>

      <div className={cl.price}>
        <b>{price * count} ₽</b>
      </div>

      <div className={cl.remove}>
        <button onClick={onClickRemove} className={cl.btnItem}>
          <img src={clear} alt="Удалить" />
        </button>
      </div>
    </div>
  )
}

export default CartItemBlock
