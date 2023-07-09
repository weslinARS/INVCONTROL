import morgan from "morgan";
import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./database.js";

connectDB();
app.listen(PORT);
