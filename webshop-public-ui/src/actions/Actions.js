const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_ONE = 'REMOVE_ONE';
const EMPTY_CART = 'EMPTY_CART';

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

function emptyCart() {
	return {
		type: EMPTY_CART,
	};
}

export { ADD_TO_CART, REMOVE_ONE, EMPTY_CART, emptyCart, addToCart, removeOne };
