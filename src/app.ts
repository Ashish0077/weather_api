import express from "express";
import morgan from "morgan";
import connectDB from "./database/db";
import routes from "./routes/routes";

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

export default app;
