import React from 'react'
import axios from 'axios'
import qs from 'qs'

import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

import { list } from '../components/Sort'

import Sort from '../components/Sort'
import Categories from '../components/Categories'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Pagination from '../components/Pagination/Pagination'

const Home = () => {
  const navigate = useNavigate()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const { searchValue } = React.useContext(SearchContext)

  function onChangeCategory(id) {
    dispatch(setCategoryId(id))
  }

  function onChangePage(number) {
    dispatch(setCurrentPage(number))
  }

  function fetchPizzas() {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://629f0d20461f8173e4df32d8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${querryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      )
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home
