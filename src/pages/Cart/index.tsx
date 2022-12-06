import React from 'react'
import { Link } from 'react-router-dom'
import cl from './Cart.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../../components/CartItem'
import CartEmpty from '../../components/CartEmpty'
import { selectCart } from '../../redux/cart/selectors'
import { clearItems } from '../../redux/cart/slice'

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
    <div className={cl.cart}>
      <div className={cl.cartTop}>
        <h2 className={cl.cartTitle}>
          <img width={18} src="#" alt="" />
          Корзина
        </h2>

        <div onClick={onClickClear} className={cl.cartClear}>
          <span>Очистить корзину</span>
        </div>
      </div>

      <div className={cl.contentItems}>
        {items.map((item: any) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className={cl.cartFooter}>
        <div className={cl.cartFooterDetails}>
          <span>
            Всего пицц: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </span>
        </div>

        <div className={cl.cartFooterBtns}>
          <Link to="/" className={cl.btnBack}>
            Вернуться назад
          </Link>

          <div className={cl.btnPay}>Оплатить сейчас</div>
        </div>
      </div>
    </div>
  )
}

export default Cart
