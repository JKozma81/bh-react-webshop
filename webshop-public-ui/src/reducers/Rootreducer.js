import InitialState from '../store/Store';
import { ADD_TO_CART, REMOVE_ONE } from '../actions/Actions';

export default function RootReducer(state = InitialState, action) {
	switch (action.type) {
		case ADD_TO_CART: {
			const cartItem = state.cart.find(
				(item) => item.sku === action.itemSku
			);
			const productInStock = state.products.find(
				(item) => item.sku === action.itemSku
			);
			let newCart;

			if (cartItem) {
				newCart = state.cart.map((itemInCart) => {
					if (itemInCart.sku === cartItem.sku) {
						return {
							...itemInCart,
							qty: itemInCart.qty + 1,
						};
					}
					return {
						...itemInCart,
					};
				});
			} else {
				newCart = [
					...state.cart,
					{
						sku: productInStock.sku,
						name: productInStock.name,
						qty: 1,
						price: productInStock.price,
					},
				];
			}

			const newProducts = state.products.map((product) => {
				if (product.sku !== action.itemSku) {
					return {
						...product,
					};
				}

				return {
					...product,
					qty: product.qty - 1 >= 0 ? product.qty - 1 : product.qty,
				};
			});

			return {
				...state,
				products: newProducts,
				cart: newCart,
			};
		}

		case REMOVE_ONE: {
			let cartItem = state.cart.find(
				(item) => item.sku === action.itemSku
			);
			const productInStock = state.products.find(
				(item) => item.sku === action.itemSku
			);

			let newCart;

			const newProducts = state.products.map((product) => {
				if (product.sku !== action.itemSku) {
					return {
						...product,
					};
				}

				return {
					...product,
					qty: product.qty + 1,
				};
			});

			if (cartItem) {
				if (cartItem.qty - 1 <= 0) {
					newCart = state.cart.filter((item) => {
						if (item.sku !== cartItem.sku) {
							return {
								...item,
							};
						}
					});
				} else {
					newCart = state.cart.map((itemInCart) => {
						if (itemInCart.sku === cartItem.sku) {
							return {
								...itemInCart,
								qty: itemInCart.qty - 1,
							};
						}
						return {
							...itemInCart,
						};
					});
				}
			} else {
				newCart = [
					...state.cart,
					{
						sku: productInStock.sku,
						name: productInStock.name,
						qty: 1,
						price: productInStock.price,
					},
				];
			}
			return {
				...state,
				products: newProducts,
				cart: newCart,
			};
		}

		default:
			return state;
	}
}
