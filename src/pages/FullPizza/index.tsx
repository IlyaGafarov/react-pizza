import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import cl from './FullPizza.module.scss'
import Loader from '../../components/UI/Loader'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://629f0d20461f8173e4df32d8.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        console.log('Error', error)
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return (
      <div className={cl.content}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={cl.content}>
      <img className={cl.preview} src={pizza.imageUrl} alt="" />

      <div className={cl.description}>
        <h2 className={cl.title}>{pizza.title}</h2>
        <h4 className={cl.price}>от {pizza.price} ₽</h4>
        <div className={cl.footer}>
          <Link to="/">
            <button className={cl.button}>на главную</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FullPizza
