const mongoose = require("mongoose");

const schema = mongoose.Schema ({
    title: {type: String, require: true, max: 150},
    price: {type: Number, require: true },
    thumbnail: { type: String, require : true, max: 300 },
});

const Product = mongoose.model("products-Koa", schema);

module.exports = Product;