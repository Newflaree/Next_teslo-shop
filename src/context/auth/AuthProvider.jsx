// React
import { useReducer } from 'react';
// Context
import { AuthContext, authReducer } from './';


const AUTH_INITIAL_STATE =	{
  isLoggedIn: false,
  user: undefined,

}

export const AuthProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );

  return (
    <AuthContext.Provider
      value={{
        ...state
        // Methods

      }}
    >
      { children }
    </AuthContext.Provider>
  );
};
