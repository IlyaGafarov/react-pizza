import React from 'react'
import qs from 'qs'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

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
  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  function onChangeCategory(id) {
    dispatch(setCategoryId(id))
  }

  function onChangePage(number) {
    dispatch(setCurrentPage(number))
  }

  async function getPizzas() {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    )
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

    // if (!isSearch.current) {
    getPizzas()
    // }

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
      {status === 'error' ? (
        <h2>Ошибочка вышла, не повезло, не фартануло :(</h2>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home
