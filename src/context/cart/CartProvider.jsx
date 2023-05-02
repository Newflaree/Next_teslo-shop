// React
import { useReducer } from 'react';
// Context
import { CartContext, cartReducer } from './';


const CART_INITIAL_STATE =	{
  cart: []
}

export const CartProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );

  const addProductToCart = ( product ) => {
    // TODO: 
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        // Methods
        addProductToCart
      }}
    >
      { children }
    </CartContext.Provider>
  );
};
