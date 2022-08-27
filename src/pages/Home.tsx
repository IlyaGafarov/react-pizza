import React from 'react'

import { useSelector } from 'react-redux'
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

import Sort from '../components/Sort'
import Categories from '../components/Categories'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Pagination from '../components/Pagination/Pagination'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onChangePage(page: number) {
    dispatch(setCurrentPage(page))
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
        currentPage: String(currentPage),
      }),
    )

    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    getPizzas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
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
