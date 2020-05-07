import initialState from '../store/Store';
import { GET_PRODUCTS_AND_IMAGES } from '../actions/Actions';

export default function RootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS_AND_IMAGES:
			return {
				...state,
				products: [...state.products, ...action.products],
				images: [...state.images, ...action.images],
			};
		default:
			return state;
	}
}
