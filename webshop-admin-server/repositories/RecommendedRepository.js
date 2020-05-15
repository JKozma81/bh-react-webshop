class RecommendedRepository {
	constructor(database) {
		this.dataBase = database;
	}

	getAllRecommended() {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.all(
						'SELECT main_sku, product_sku FROM recommended',
						(err, results) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at getting recommendations data from database: ${err.toString()}`,
										},
									],
								});
							resolve(results);
						}
					);
				});
			} catch (err) {
				console.error(err.errors ? err.error.message : err.message);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation : ${err.toString()}`,
						},
					],
				});
			}
		});
	}
}

module.exports = RecommendedRepository;
