const ProductDAO = require("../dao/factory.js");

const productsContainer = ProductDAO;

const authError = (req) => ({
	error: -1,
	description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`,
});

const getProducts = async (ctx) => {
	try {
		ctx.json(await productsContainer.getAll());
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const getProduct = async (ctx) => {
	try {
		const productId = req.params.id;
		const product = await productsContainer.getById(productId);

		if (!product) {
			return res.status(400).json({ error: "producto no encontrado" });
		}
		ctx.render("product", { product });
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const updateProduct = async (ctx) => {
	try {
		const productId = req.params.id;
		if (!administrador) {
			return ctx.send(authError(ctx.req));
		}

		if (
			await productsContainer.updateById(productId, {
				...ctx.body,
			})
		) {
			return ctx.status(201).send(productsContainer.getById(productId));
		}

		return ctx
			.status(400)
			.send({ error_description: "Producto no encontrado." });
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const createProduct = async (req, res) => {
	try {
		const product = req.body;
		const newProduct = await productsContainer.create(product);

		return ctx.status(201).json({ product: newProduct });
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const addProductToCart = async (ctx) => {
	try {
		const productId = req.cookies.id;

		const { quantity } = req.body;
		const user = req.user;
		productsContainer.addProductToCart(productId, quantity, user);
		ctx.redirect("/");
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const deleteProduct = async (ctx) => {
	try {
		const product = await productsContainer.deleteById(ctx.params.id);
		if (!product) {
			return ctx
				.status(400)
				.json({ error_description: "Producto no encontrado." });
		}
		ctx.status(200).json({ product });
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

const deleteAll = async (ctx) => {
	try {
		if (!administrador) {
			ctx.send(authError(ctx.req));
		}
		ctx.status(200).send(await productsContainer.deleteAll());
	} catch (err) {
		return ctx.status(500).json({ error_description: "Error del servidor." });
	}
};

module.exports = {
	getProducts,
	getProduct,
	updateProduct,
	createProduct,
	addProductToCart,
	deleteProduct,
	deleteAll,
};