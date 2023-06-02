// React
import { useEffect, useReducer } from 'react';
// Axios
import axios from 'axios';
// Cookies
import Cookie from 'js-cookie';
//
// Api
import { tesloApi } from '@/api';
// Context
import { CartContext, cartReducer } from './';


const CART_INITIAL_STATE =	{
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
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
  }, [] );

  useEffect( () => {
    if ( Cookie.get( 'firstName' ) ) {
      const shippingAddressFromCookies = {
        firstName: Cookie.get( 'firstName' ) || '',
        lastName: Cookie.get( 'lastName' ) || '',
        address: Cookie.get( 'address' ) || '',
        address2: Cookie.get( 'address2' ) || '',
        zip: Cookie.get( 'zip' ) || '',
        city: Cookie.get( 'city' ) || '',
        country: Cookie.get( 'country' ) || '',
        phone: Cookie.get( 'phone' ) || ''
      }

      dispatch({
        type: '[CART] - Load Addres From Cookies | storage',
        payload: shippingAddressFromCookies
      })
    }
  }, [] );

  /*
  useEffect( () => {
    Cookie.set( 'cart', JSON.stringify( state.cart ) ) || JSON.stringify( [] );
  }, [ state.cart ] );
    * */
  
  useEffect( () => {
    const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0 );

    const subTotal = state.cart.reduce( ( prev, current ) => {
      return ( current.price * current.quantity ) + prev;
    }, 0 );

    const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE ) || 0;

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * ( taxRate + 1 )
    }

    dispatch({
      type: '[CART] - Update Order Summary',
      payload: orderSummary
    });
  }, [ state.cart ] );

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

  const removeCartProduct = ( product ) => {
    const productsAfterRemoval = state.cart.filter( p => {
      if ( p._id + p.size !== product._id + product.size ) return p;
    });

    dispatch({
      type: '[CART] - Remove Product In Cart',
      payload: productsAfterRemoval
    });

    Cookie.set( 'cart', JSON.stringify( state.cart ) );
  }

  const updateAddress = ( address ) => {
    Cookie.set( 'firstName', address.firstName );
    Cookie.set( 'lastName', address.lastName );
    Cookie.set( 'address', address.address );
    Cookie.set( 'address2', address.address2 || '' );
    Cookie.set( 'zip', address.zip );
    Cookie.set( 'city', address.city );
    Cookie.set( 'country', address.country );
    Cookie.set( 'phone', address.phone );

    dispatch({
      type: '[CART] - Update Shipping Address',
      payload: address
    })
  }

  const createOrder = async () => {
    if ( !state.shippingAddress ) throw new Error( 'There is no address to send' )
    
    const body = {
      orderItems: state.cart.map( p => ({
        ...p,
        size: p.size
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false
    }

    try {
      const { data } = await tesloApi.post( '/orders', body );
      // TODO: Dispatch
      console.log({ data });
      return {
        hasError: false,
        message: data.newOrder._id
      }

    
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) return {
        hasError: true,
        message: error.response?.data.message
      }

      return {
        hasError: true,
        message: 'Error no controlado, Hable con el administrador'
      }
    }
  }


  return (
    <CartContext.Provider
      value={{
        ...state,
        // Methods
        addProductToCart,
        createOrder,
        removeCartProduct,
        updateCartQuantity,
        updateAddress
      }}
    >
      { children }
    </CartContext.Provider>
  );
};
