export const roundToTwoDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = state.cartItems.reduce((acc, currentItem) => {
    return acc + Number(currentItem.price) * Number(currentItem.quantity);
  }, 0);

  // calculate shipping price: $100 or more is free, else $10.
  state.shippingPrice =
    state.itemsPrice > 100 || state.cartItems.length === 0 ? 0 : 10;

  // calculate tax price: 15% flat tax rate.
  state.taxPrice = Number(Number(state.itemsPrice) * 0.15).toFixed(2);

  // calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // save to local storage
  localStorage.setItem('cart', JSON.stringify(state));
};
