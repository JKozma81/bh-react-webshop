import initialState from '../store/Store';
import {
  GET_PRODUCTS_AND_IMAGES,
  GET_SINGLE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
  MODIFY_PRODUCT_INFO,
  ADD_NEW_PRODUCT,
} from '../actions/Actions';

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_AND_IMAGES:
      return {
        ...state,
        products: [...state.products, ...action.products],
        images: [...state.images, ...action.images],
      };

    case GET_SINGLE_PRODUCT_DATA:
      return {
        ...state,
        singleProductData: action.productData,
        imagesForSingleProduct: action.images,
      };

    case CLEAR_PRODUCT_DATA:
      return {
        ...state,
        singleProductData: {},
        imagesForSingleProduct: [],
      };

    case MODIFY_PRODUCT_INFO:
      return {
        ...state,
        products: [
          ...state.products.filter(
            (product) => product.sku !== action.modifiedProduct.sku
          ),
          {
            ...state.products.find(
              (product) => product.sku === action.modifiedProduct.sku
            ),
            ...action.modifiedProduct,
          },
        ],
      };

    case ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.newProductInfo.product],
        images: action.newProductInfo.images.length
          ? [...state.images, ...action.newProductInfo.images]
          : [...state.images],
      };
    default:
      return state;
  }
}
