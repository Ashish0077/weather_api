import app from "./app";
import { port } from "./config";

app.listen(port, () => {
	console.log(`App Running at : http://localhost:${port}`);
});
