const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dataBase = new sqlite3.Database('./model/webshop.db');

const ProductController = require('./controllers/ProductController');
const OrdersController = require('./controllers/OrdersController');

const SKUService = require('./services/SkuService');
const ProductServices = require('./services/ProductServices');
const OrdersService = require('./services/OrdersService');
const RecommendationsService = require('./services/RecommendationsService');
const PromotionsService = require('./services/PromotionsService');
const ProductRepository = require('./repositories/ProductRepository');
const ImageService = require('./services/ImageService');
const ImageRepository = require('./repositories/ImageRepository');
const OrdersRepository = require('./repositories/OrdersRepository');
const PromotionsRepository = require('./repositories/PromotionsRepository');
const RecommendedRepository = require('./repositories/RecommendedRepository');
const productRepository = new ProductRepository(dataBase);
const ordersRepository = new OrdersRepository(dataBase);
const promotionsRepository = new PromotionsRepository(dataBase);
const recommendedRepository = new RecommendedRepository(dataBase);
const imageRepository = new ImageRepository(dataBase);
const productService = new ProductServices(productRepository);
const imageService = new ImageService(imageRepository);
const ordersService = new OrdersService(ordersRepository);
const promotionsService = new PromotionsService(promotionsRepository);
const recommendationsService = new RecommendationsService(
	recommendedRepository
);
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
		promotionsService,
		recommendationsService,
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

app.get(
	'/orders',
	OrdersController.getOrders({
		ordersService,
	})
);

// app.post(
// 	'/orders',
// 	OrdersController.addOrder({
// 		productService,
// 		ordersService,
// 	})
// );

app.put(
	'/products/:sku',
	ProductController.modifyProduct({
		productService,
	})
);

app.delete(
	'/product/:sku',
	ProductController.deleteProduct({
		imageService,
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

app.put(
	'/files/:id',
	ProductController.modifyPrimaryPicture({
		imageService,
	})
);

app.delete(
	'/files/:id',
	ProductController.deleteImageFromDB({
		imageService,
	})
);

app.listen(port, () =>
	console.log(`App is started and listening at http://localhost:${port}`)
);
