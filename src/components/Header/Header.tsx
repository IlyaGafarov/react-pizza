import React from 'react'
import cl from './Header.module.scss'

import pizzaLogo from '../../assets/img/pizza.png'
import cartLogo from '../../assets/img/cart-logo.svg'

import { Link, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/cart/selectors'

import Search from '../Search/Search'

const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)
  const isMounted = React.useRef(false)

  const location = useLocation()

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  return (
    <div className={cl.header}>
      <div className={cl.content}>
        <div className={cl.contentLeft}>
          <Link to="/">
            <div className={cl.headerLogo}>
              <img className={cl.pizzaLogo} src={pizzaLogo} alt="Pizza logo" />
              <div>
                <h1 className={cl.title}>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>

          {location.pathname !== '/cart' && <Search />}
        </div>

        <div className={cl.contentRight}>
          {location.pathname !== '/cart' && (
            <div className="header__cart">
              <Link to="/cart" className={cl.btn}>
                <span>{totalPrice} ₽</span>
                <div className={cl.delimiter}></div>

                <img className={cl.btnLogo} src={cartLogo} alt="" />
                <span>{totalCount}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
