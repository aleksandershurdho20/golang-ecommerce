import { cartActions } from "../actions/cart";
import { createSlice } from "@reduxjs/toolkit";



const initialState ={
    loading:true,
    error:"",
    cart:[]
}




  const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
      ...cartActions
    },
   
  })

  export const cartState = (state) => state.cartSlice;
  export const {
    addProductToCart,
    removeProductFromCart,
    emptyCartProducts
    
  } = cartSlice.actions;

  export default cartSlice.reducer

