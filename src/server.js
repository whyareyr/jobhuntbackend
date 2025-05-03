import app from "./app.js";
import { serverPort } from "./config/server.js";

app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});
