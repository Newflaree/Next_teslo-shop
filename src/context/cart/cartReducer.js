
export const CartReducer = ( state, action ) => {
  switch ( action.type ) {
    case '[CART] - LoadCart from cookies | storage':
      return {
        ...state,
      }

    case '[CART] - Add product':
      return {
        ...state,
      }

    default: 
      return state;
  }
};
