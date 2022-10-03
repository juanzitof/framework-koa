const config = require("../config/index.js");

let productsDao;

if (`${config.DB}` === "mongo") {
	const { default: ProductMongoDAO } = require(`./product/${config.DB}DAO.js`);

	productsDao = ProductMongoDAO;
} else {
	console.log("Solo existe persistencia en mongo");
}

module.exports = productsDao;