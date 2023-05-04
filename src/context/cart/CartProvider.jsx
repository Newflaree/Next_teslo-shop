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
        type: '[CART] - Update Products In Cart',
        payload: cookieProducts
      });
    
    } catch ( error ) {
      dispatch({
        type: '[CART] - Update Products In Cart',
        payload: []
      });
    }
  }, [] );

  /*
  useEffect( () => {
    Cookie.set( 'cart', JSON.stringify( state.cart ) );
  }, [ state.cart ] );
    * */

  const addProductToCart = ( product ) => {
    const isProductInCart = state.cart.some( p => p._id === product._id );

    if ( !isProductInCart ) {
      dispatch({
        type: '[CART] - Update Products In Cart',
        payload: [ ...state.cart, product ]
      });

      return Cookie.set( 'cart', JSON.stringify( state.cart ) );
    }

    const isProductInCartButDifferentSize = state.cart.some( p => {
      return p._id === product._id && p.size === product.size
    });

    if ( !isProductInCartButDifferentSize ) {
      dispatch({
        type: '[CART] - Update Products In Cart',
        payload: [ ...state.cart, product ]
      });

      return Cookie.set( 'cart', JSON.stringify( state.cart ) );
    }

    const updatedProducts = state.cart.map( p => {
      if ( p._id !== product._id ) return p;
      if ( p.size !== product.size ) return p;

      p.quantity += product.quantity;

      return p;
    });
    
    dispatch({
      type: '[CART] - Update Products In Cart',
      payload: updatedProducts
    });

    return Cookie.set( 'cart', JSON.stringify( state.cart ) );
  }

  const updateCartQuantity = ( product ) => {
    dispatch({
      type: '[CART] - Update Cart Quantity',
      payload: product
    });

    return Cookie.set( 'cart', JSON.stringify( state.cart ) );
  }


  return (
    <CartContext.Provider
      value={{
        ...state,
        // Methods
        addProductToCart,
        updateCartQuantity
      }}
    >
      { children }
    </CartContext.Provider>
  );
};
