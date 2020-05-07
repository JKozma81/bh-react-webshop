const GET_PRODUCTS_AND_IMAGES = 'GET_PRODUCTS_AND_IMAGES';

function getProductsAndImages(products, images) {
	return {
		type: GET_PRODUCTS_AND_IMAGES,
		products,
		images,
	};
}

export { GET_PRODUCTS_AND_IMAGES, getProductsAndImages };
