const GET_PRODUCTS_AND_IMAGES = 'GET_PRODUCTS_AND_IMAGES';
const GET_SINGLE_PRODUCT_DATA = 'GET_SINGLE_PRODUCT_DATA';
const CLEAR_PRODUCT_DATA = 'CLEAR_PRODUCT_DATA';
const MODIFY_PRODUCT_INFO = 'MODIFY_PRODUCT_INFO';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const ADD_IMAGES = 'ADD_IMAGES';
const GET_IMAGES = 'GET_IMAGES';
const MODIFY_PRIMARY_PICTURE = 'MODIFY_PRIMARY_PICTURE';

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

function modifyProductInfo(modifiedProduct) {
  return {
    type: MODIFY_PRODUCT_INFO,
    modifiedProduct,
  };
}

function addNewProduct(newProductInfo) {
  return {
    type: ADD_NEW_PRODUCT,
    newProductInfo,
  };
}

function addImages(images) {
  return {
    type: ADD_IMAGES,
    images,
  };
}

function getImages(sku) {
  return {
    type: GET_IMAGES,
    sku,
  };
}

function modifyPrimaryPicture(picture) {
  return {
    type: MODIFY_PRIMARY_PICTURE,
    picture,
  };
}

export {
  GET_PRODUCTS_AND_IMAGES,
  GET_SINGLE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
  MODIFY_PRODUCT_INFO,
  ADD_NEW_PRODUCT,
  ADD_IMAGES,
  GET_IMAGES,
  MODIFY_PRIMARY_PICTURE,
  getProductsAndImages,
  getSingleProductData,
  clearProductData,
  modifyProductInfo,
  addNewProduct,
  addImages,
  getImages,
  modifyPrimaryPicture,
};
