// React
import { useReducer } from 'react';
// Axios
import axios from 'axios';
// JS Cookie
import Cookie from 'js-cookie';
//
// Api
import { tesloApi } from '@/api';
// Context
import { AuthContext, authReducer } from './';


const AUTH_INITIAL_STATE =	{
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );

  const loginUser = async ( email = '', password = '' ) => {
    try {
      const { data } = await tesloApi.post( '/auth/login', { email, password } );
      const { token, registeredUser } = data;
      console.log({ token, registeredUser });

      Cookie.set( 'token', token );
      dispatch({ type: '[AUTH] - Login', payload: registeredUser });

      return true;

    } catch ( error ) {
      console.log( error.response.data );
      return false;
    }
  }

  const registerUser = async ( email = '', password = '', name = '' ) => {
    try {
      const { data } = await tesloApi.post( '/auth/register', { email, password, name } );
      const { token, newUser } = data;
      console.log({ token, newUser });

      Cookie.set( 'token', token );
      dispatch({ type: '[AUTH] - Login', payload: newUser });

      return {
        hasError: false
      }

    } catch ( error ) {
      console.log( error.response.data );
      if ( axios.isAxiosError( error ) ) {
        return {
          hasError: true,
          message: error.response.data.message
        }
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario. Intente más tarde'
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Methods
        loginUser,
        registerUser
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};
