import { createAsyncThunk } from '@reduxjs/toolkit'
import { Pizza } from './types'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://629f0d20461f8173e4df32d8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )

    return data
  },
)
