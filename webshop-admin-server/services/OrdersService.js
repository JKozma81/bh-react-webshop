class OrdersService {
	constructor(repository) {
		this.repository = repository;
	}

	async getAllOrders() {
		try {
			return await this.repository.getAllOrders();
		} catch (err) {
			console.error(err.message);
		}
	}

	async addOrder(orderData) {
		try {
			return await this.repository.addOrder(orderData);
		} catch (err) {
			console.error(err.message);
		}
	}
}

module.exports = OrdersService;
