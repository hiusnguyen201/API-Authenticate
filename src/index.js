import http from "http";
import * as dotenv from "dotenv";

import app from "./app.js";

dotenv.config();
const serverHost = "localhost" || "127.0.0.1";
const serverPort = process.env.PORT;
const serverApi = http.createServer(app);

serverApi.listen(serverPort, () => {
  console.log(`Server running at http://${serverHost}:${serverPort}`);
});
