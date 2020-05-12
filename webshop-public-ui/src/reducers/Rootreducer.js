import InitialState from '../store/Store';
import { ADD_TO_CART, REMOVE_ONE } from '../actions/Actions';

export default function RootReducer(state = InitialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const cartItem = state.cart.find((item) => item.sku === action.itemSku);
      const productInStock = state.products.find(
        (item) => item.sku === action.itemSku
      );

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.sku !== action.itemSku) {
            return {
              ...product,
            };
          }

          return {
            ...product,
            qty: product.qty - 1 >= 0 ? product.qty - 1 : product.qty,
          };
        }),

        cart: cartItem
          ? [
              ...state.cart.map((itemInCart) => {
                if (itemInCart.sku === cartItem.sku) {
                  return {
                    ...itemInCart,
                    qty: itemInCart.qty + 1,
                  };
                }
                return {
                  ...itemInCart,
                };
              }),
            ]
          : [
              ...state.cart,
              {
                sku: productInStock.sku,
                name: productInStock.name,
                qty: 1,
                price: productInStock.price,
              },
            ],
      };

    case REMOVE_ONE:
      return {};

    default:
      return state;
  }
}
