// React
import { useEffect, useReducer } from 'react';
// Cookies
import Cookie from 'js-cookie';
// Context
import { CartContext, cartReducer } from './';


const CART_INITIAL_STATE =	{
  cart: []
}

export const CartProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );

  useEffect( () => {
    try {
      const cookieProducts = Cookie.get( 'cart' )
        ? JSON.parse( Cookie.get( 'cart' ) )
        : [];

      dispatch({
        type: '[CART] - Load Cart From Cookies | storage',
        payload: cookieProducts
      });
    } catch ( error ) {
      dispatch({
        type: '[CART] - Load Cart From Cookies | storage',
        payload: []
      });
    }
  }, []);

  useEffect( () => {
     Cookie.set( 'cart', JSON.stringify( state.cart ) );
  }, [ state.cart ] );

  const addProductToCart = ( product ) => {
    const isProductInCart = state.cart.some( p => p._id === product._id );

    if ( !isProductInCart ) return dispatch({
      type: '[CART] - Update Products In Cart',
      payload: [ ...state.cart, product ]
    })

    const isProductInCartButDifferentSize = state.cart.some( p => {

      return p._id === product._id && p.size === product.size
    });
    if ( !isProductInCartButDifferentSize ) return dispatch({
      type: '[CART] - Update Products In Cart',
      payload: [ ...state.cart, product ]
    })

    const updatedProducts = state.cart.map( p => {
      if ( p._id !== product._id ) return p;
      if ( p.size !== product.size ) return p;

      p.quantity += product.quantity;

      return p;
    });

    dispatch({
      type: '[CART] - Update Products In Cart',
      payload: [ ...updatedProducts ]
    });
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
