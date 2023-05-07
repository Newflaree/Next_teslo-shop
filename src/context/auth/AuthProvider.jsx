// React
import { useReducer } from 'react';
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Methods
        loginUser,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};
