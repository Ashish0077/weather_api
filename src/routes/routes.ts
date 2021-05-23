import express from "express";
import { updateWeatherData } from "../controllers/weather";
const router = express.Router();

router.get("/updateWeatherData", updateWeatherData);

export default router;
