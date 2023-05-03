export const cartReducer = ( state, action ) => {
  switch ( action.type ) {
    case '[CART] - Load Cart From Cookies | storage':
      return {
        ...state,
        cart: [ ...action.payload ]
      }

    case '[CART] - Update Products In Cart':
      return {
        ...state,
        cart: [ ...action.payload ]
      }

    default: 
      return state;
  }
};
