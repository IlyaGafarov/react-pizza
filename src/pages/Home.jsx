import React from 'react'

import Sort from '../components/Sort'
import Categories from '../components/Categories'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://629f0d20461f8173e4df32d8.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [])

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </>
  )
}

export default Home
