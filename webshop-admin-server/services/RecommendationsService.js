class RecommendationsService {
	constructor(repository) {
		this.repository = repository;
	}

	async getAllRecommended() {
		try {
			return await this.repository.getAllRecommended();
		} catch (err) {
			console.error(err.message);
		}
	}
}

module.exports = RecommendationsService;
