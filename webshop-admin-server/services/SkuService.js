const fs = require('fs');

class SKUService {
	generateSKU(text) {
		let newSku = '';
		const words = text.split(' ');
		words.forEach((word) => {
			const regex = new RegExp('^[a-zA-Z0-9]*$');
			if (!regex.test(word[0])) {
				return (newSku = newSku);
			}
			return (newSku += word[0]);
		});
		return newSku.length >= 12 ? newSku.slice(0, 12) : newSku;
	}

	checkSKUExists(sku) {
		return fs.existsSync(`./static/img/${sku}`);
	}
}

module.exports = SKUService;
