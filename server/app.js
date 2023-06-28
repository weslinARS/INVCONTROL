import express from "express";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import orderRoutes from "./routes/order.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/users.routes.js";
import bodyParser from "body-parser";
let app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan("combined"));
app.use((req, res, next)=>{
	console.log("metodo : "+ req.method+" url "+ req.url);
	console.log("body : "+ JSON.stringify(req.body));
	next();
})
// ! Middleware ===============================
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.urlencoded({ extended: false }));
// ! Routes ===================================
app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);
app.use(supplierRoutes);
app.use(salesRoutes);
export default app;
