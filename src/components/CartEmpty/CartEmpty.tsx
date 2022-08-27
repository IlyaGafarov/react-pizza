import React from 'react'
import { Link } from 'react-router-dom'
import style from './CartEmpty.module.scss'
import cartEmpty from '../../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => {
	return (
		<div className={style.cartEmpty}>
			<h2 className={style.title}>Корзина пустая</h2>
			<p className={style.description}>
				Чтобы заказать пиццу, вернитесь на главную страницу.
			</p>
			<img className={style.cartImg} src={cartEmpty} alt="" />

			<Link to="/" className={style.btnLink}>
				<p>Вернуться назад</p>
			</Link>
		</div>
	)
}

export default CartEmpty
