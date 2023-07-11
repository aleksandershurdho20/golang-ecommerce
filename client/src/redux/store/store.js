import { configureStore } from '@reduxjs/toolkit'

import Cart from '../slices/Cart.js'



export const store = configureStore({
  reducer: {
    Cart
  },
})