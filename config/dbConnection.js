const Mongoose = require("mongoose");
const { mongoURI } = require("./index.js");

const connection = Mongoose.connect(`${mongoURI}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

Mongoose.connection.on("connected", () => {
	console.log(`Mongoose is connected`);
});

Mongoose.connection.on("error", (err) => {
	console.log(`Mongoose connection error: ${err}`);
});

module.exports = connection;