import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utilities/cartUtilities';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // get the item to be added to cart.
      const item = action.payload;

      // check if the item is in cart.
      const itemInCart = state.cartItems.find((currentItem) => {
        return currentItem._id === item._id;
      });

      // add a new item or just update the quantity.
      if (itemInCart) {
        state.cartItems = state.cartItems.map((currentItem) => {
          return currentItem._id === itemInCart._id ? item : currentItem;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload;
      });

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
