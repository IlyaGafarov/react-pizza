import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../components/CartItem'
import CartEmpty from '../components/CartEmpty/CartEmpty'
import { selectCart } from '../redux/cart/selectors'
import { clearItems } from '../redux/cart/slice'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

  function onClickClear() {
    if (window.confirm('очистить корзину?')) {
      dispatch(clearItems())
    }
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img width={18} src="#" alt="" />
            Корзина
          </h2>

          <div onClick={onClickClear} className="cart__clear">
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>

          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>Вернуться назад</span>
            </Link>

            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
