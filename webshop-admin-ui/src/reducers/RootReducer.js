import initialState from '../store/Store';
import {
  GET_PRODUCTS_AND_IMAGES,
  GET_SINGLE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
  MODIFY_PRODUCT_INFO,
  ADD_NEW_PRODUCT,
  ADD_IMAGES,
  GET_IMAGES,
  MODIFY_PRIMARY_PICTURE,
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

    case ADD_IMAGES:
      return {
        ...state,
        images: [
          ...state.images.filter(
            (image) => image.product_sku !== action.images[0].product_sku
          ),
          ...action.images,
        ],
      };

    case GET_IMAGES:
      return {
        ...state,
        imagesForSingleProduct: state.images.filter(
          (image) => image.product_sku === action.sku
        ),
      };

    case MODIFY_PRIMARY_PICTURE:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.product_sku === action.picture.product_sku) {
            if (image.id === action.picture.id) {
              return {
                ...image,
                ...action.picture,
              };
            }
            return {
              ...image,
              is_primary: 0,
            };
          }
          return {
            ...image,
          };
        }),
      };

    default:
      return state;
  }
}
