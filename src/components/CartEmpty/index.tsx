import React from 'react'
import { Link } from 'react-router-dom'
import cl from './CartEmpty.module.scss'
import cartEmpty from '../../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => {
	return (
		<div className={cl.cartEmpty}>
			<h2 className={cl.title}>Корзина пустая</h2>
			<p className={cl.description}>
				Чтобы заказать пиццу, вернитесь на главную страницу.
			</p>
			<img className={cl.cartImg} src={cartEmpty} alt="" />

			<Link to="/" className={cl.btnLink}>
				<p>Вернуться назад</p>
			</Link>
		</div>
	)
}

export default CartEmpty
