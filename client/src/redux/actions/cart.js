
export const cartActions = {
  
  addProductToCart: (state,action) => {
    state.cart = [
      ...state.cart,
      action.payload
    ]

  },
  removeProductFromCart: (state, action) => {
    const tempArr = [...state.cart];
    tempArr.splice(action.payload, 1);
    state.cart = tempArr;
  },

  
    
};
