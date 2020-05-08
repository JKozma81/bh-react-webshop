const GET_PRODUCTS_AND_IMAGES = 'GET_PRODUCTS_AND_IMAGES';
const GET_SINGLE_PRODUCT_DATA = 'GET_SINGLE_PRODUCT_DATA';
const CLEAR_PRODUCT_DATA = 'CLEAR_PRODUCT_DATA';

function getProductsAndImages(products, images) {
  return {
    type: GET_PRODUCTS_AND_IMAGES,
    products,
    images,
  };
}

function getSingleProductData(productData, images) {
  return {
    type: GET_SINGLE_PRODUCT_DATA,
    productData,
    images,
  };
}

function clearProductData() {
  return {
    type: CLEAR_PRODUCT_DATA,
  };
}

export {
  GET_PRODUCTS_AND_IMAGES,
  GET_SINGLE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
  getProductsAndImages,
  getSingleProductData,
  clearProductData,
};
