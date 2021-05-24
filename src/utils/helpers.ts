import { cities } from "./constants";

// Helper function for checking if the user provided city name is valid or not
export const isCityValid = (userCity: string): boolean => {
	for (const city of cities) {
		if (city == userCity) return true;
	}
	return false;
};

export const duplicateCity = (city1: string, city2: string, city3: string): boolean => {
	if (city1 == city2 || city1 == city3 || (city2 && city3 && city2 == city3)) return true;
	return false;
};
