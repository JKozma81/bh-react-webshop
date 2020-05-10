const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dataBase = new sqlite3.Database('./model/webshop.db');

const ProductController = require('./controllers/ProductController');

const SKUService = require('./services/SkuService');
const ProductServices = require('./services/ProductServices');
const ProductRepository = require('./repositories/ProductRepository');
const ImageService = require('./services/ImageService');
const ImageRepository = require('./repositories/ImageRepository');
const productRepository = new ProductRepository(dataBase);
const productService = new ProductServices(productRepository);
const imageRepository = new ImageRepository(dataBase);
const imageService = new ImageService(imageRepository);
const skuService = new SKUService();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());

app.get(
  '/products',
  ProductController.getProductsAndImages({
    productService,
    imageService,
  })
);

app.post(
  '/product',
  ProductController.addProduct({
    productService,
    skuService,
    imageService,
  })
);

app.put(
  '/products/:sku',
  ProductController.modifyProduct({
    productService,
  })
);

app.get(
  '/products/:sku/files',
  ProductController.getProductBySKU({
    productService,
    imageService,
    skuService,
  })
);

app.post(
  '/products/:sku/files',
  ProductController.uploadNewPictures({
    imageService,
  })
);

// app.get(
//   '/products/:sku/pictures',
//   ProductController.getProductImages({
//     productService,
//   })
// );

// app.put(
//   '/files/:id',
//   ProductController.modifyPrimaryPicture({
//     productService,
//   })
// );

// app.delete(
//   '/files/:id',
//   ProductController.deleteImageFromDB({
//     productService,
//   })
// );

app.listen(port, () =>
  console.log(`App is started and listening at http://localhost:${port}`)
);
