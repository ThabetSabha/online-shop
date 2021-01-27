import {
  addItemToCart,
  decreaseItemQuantity,
  setCartItems,
} from "./cart.utils";

const INTIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CART_FROM_FIREBASE":
      return {
        ...state,
        cartItems: setCartItems(action.payload, state.cartItems),
      };
    case "TOGGLE_CART_VISABILITY":
      return {
        ...state,
        hidden: !state.hidden,
      };

    case "ADD_ITEM":
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case "CLEAR_ITEM_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case "DECREASE_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
