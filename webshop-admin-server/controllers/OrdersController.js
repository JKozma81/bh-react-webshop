class OrdersController {
	static addOrder(options) {
		const ordersService = options.ordersService;
		const productService = options.productService;
		return async (req, res) => {
			try {
				const orderedItems = req.body;
				orderedItems.orderId = Number(
					Date.now().toString() + Math.floor(Math.random() * 100 + 1)
				);
				const purchessedProducts = orderedItems.orderDetails.map(
					(item) => ({ productSKU: item.sku, qty: item.qty })
				);

				for (const product of purchessedProducts) {
					await productService.modifyProductData(product);
				}

				await ordersService.addOrder(orderedItems);

				const productsInStock = await productService.getAllProducts();
				res.json({ productsInStock });
			} catch (err) {
				console.error('Application error:', err.message);
				res.json(err);
			}
		};
	}

	static getOrders(options) {
		const ordersService = options.ordersService;

		return async (req, res) => {
			try {
				const ordersData = await ordersService.getAllOrders();

				res.json({
					ordersData,
				});
			} catch (err) {
				console.error(err.message);
				res.json(err);
			}
		};
	}
}

module.exports = OrdersController;
