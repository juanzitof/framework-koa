const Router = require("@koa/router");
const productController = require("../controllers/products.controller.js");

const productRouter = new Router();

productRouter.prefix("/api/products");

productRouter.get("/", productController.getProducts);

productRouter.get("/:id", productController.getProduct);

productRouter.post("/create", productController.createProduct);

productRouter.put("/update/:id", productController.updateProduct);

productRouter.delete("/delete/:id", productController.deleteProduct);

productRouter.delete("/delete", productController.deleteAll);

module.exports = productRouter;