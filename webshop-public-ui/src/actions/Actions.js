const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_ONE = 'REMOVE_ONE';

function addToCart(itemSku) {
  return {
    type: ADD_TO_CART,
    itemSku,
  };
}

function removeOne(itemSku) {
  return {
    type: REMOVE_ONE,
    itemSku,
  };
}

export { ADD_TO_CART, REMOVE_ONE, addToCart, removeOne };
