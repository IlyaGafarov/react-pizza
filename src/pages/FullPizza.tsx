import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://629f0d20461f8173e4df32d8.mockapi.io/items/` + id)
        setPizza(data)
      } catch (error) {
        alert('ошибочка вышла')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return <>'загрузка...'</>
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} rub.</h4>
    </div>
  )
}

export default FullPizza
