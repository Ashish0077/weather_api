import express from "express";
import morgan from "morgan";
import connectDB from "./database/db";
import routes from "./routes/routes";
import errorHandler from "./utils/errorHandler";

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(routes);
app.use(errorHandler);

export default app;
