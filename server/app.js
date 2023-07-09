import express, { request } from "express";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import orderRoutes from "./routes/order.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/users.routes.js";
import CashRegisterRoutes from "./routes/cashRegister.routes.js";
import bodyParser from "body-parser";
let app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan("combined"));
// ! Middleware ===============================
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.urlencoded({ extended: false }));
// ! Routes ===================================
// restrigiendo acceso a la ruta en caso de que la url no se la correcta , en caso de que no sea la ruta a la que se desea ingresar no se permite el acceso al router y se prosigue a comprobar si la siguiente ruta es la correcta

app.use( productRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);
app.use(supplierRoutes);
app.use(salesRoutes);
app.use(CashRegisterRoutes);

export default app;
