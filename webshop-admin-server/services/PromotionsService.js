class PromotionsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllPromos() {
    try {
      return await this.repository.getAllPromos();
    } catch (err) {
      console.error(err.message);
    }
  }

  async addPromotion(promotionData) {
    try {
      return await this.repository.addPromotion(promotionData);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = PromotionsService;
