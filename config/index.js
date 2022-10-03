require("dotenv/config");

module.exports = {
	PORT: process.env.PORT || 8080,
	DB: process.env.DB || "mongo",
	mongoURI: process.env.mongoURI,
};