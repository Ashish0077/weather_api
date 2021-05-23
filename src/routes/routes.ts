import express from "express";
import { registerUser } from "../controllers/access/register";
import { updateUserPreferences } from "../controllers/userPreferences/userPreferences";
import { updateWeatherData } from "../controllers/weatherData/weather";
const router = express.Router();

router.get("/updateWeatherData", updateWeatherData);
router.post("/registerUser", registerUser);
router.patch("/setUserPreferences", updateUserPreferences);

export default router;
