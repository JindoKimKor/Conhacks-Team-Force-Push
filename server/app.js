import cors from "cors";
import express, { json, urlencoded } from "express";

import router from "./src/routes/index.js";

// ------ Create the Express app -----
const app = express();

// ------ Configure the app ------
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"]
  })
);

// ------ json parsers ------
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(`/api`, router);

// ------ Start the server -----
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
