const Koa = require("koa");
const KoaBody = require("koa-body");
const productRouter = require("./routes/productRoutes.js")
const config = require("./config/index.js");

const app = new Koa();

if (config.DB.toLowerCase() === "mongo"){
    require("./config/dbConnection.js")
}

app.use(koaBody()); 
app.use(productRouter.routes().use(productRouter.allwedMethods()));

const PORT = config.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is up in port ${PORT} || Worker ${process.pid} started!`)
})

server.on("error", (error) => console.log(`Server error: ${error}`))