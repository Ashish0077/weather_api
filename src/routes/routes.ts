import express from "express";
import { registerUser } from "../controllers/access/register";
import { updateWeatherData } from "../controllers/weatherData/weather";
const router = express.Router();

router.get("/updateWeatherData", updateWeatherData);
router.post("/registerUser", registerUser);

export default router;
