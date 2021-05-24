import express from "express";
import { registerUser } from "../controllers/access/register";
import { updateUserPreferences } from "../controllers/userPreferences/userPreferences";
import { updateWeatherData, userWeatherData } from "../controllers/weatherData/weather";
const router = express.Router();

router.post("/updateWeatherData", updateWeatherData);
router.post("/registerUser", registerUser);
router.patch("/setUserPreferences", updateUserPreferences);
router.get("/userWeatherData", userWeatherData);

export default router;
