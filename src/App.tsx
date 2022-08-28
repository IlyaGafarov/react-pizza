import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/app.scss'

import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'

const Cart = React.lazy(() => import('./pages/Cart'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route
          path="cart"
          element={
            <Suspense fallback={<p>идет загрузка корзины</p>}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<p>идет загрузка</p>}>
              <FullPizza />
            </Suspense>
          }
        />
        
        <Route
          path="*"
          element={
            <Suspense fallback={<p>идет загрузка..</p>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
