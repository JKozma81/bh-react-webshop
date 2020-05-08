import initialState from '../store/Store';
import {
  GET_PRODUCTS_AND_IMAGES,
  GET_SINGLE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
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
    default:
      return state;
  }
}
