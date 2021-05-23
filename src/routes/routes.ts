import express from "express";
import { updateWeatherData } from "../controllers/weatherData/weather";
const router = express.Router();

router.get("/updateWeatherData", updateWeatherData);

export default router;
