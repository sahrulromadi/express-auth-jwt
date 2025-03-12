import express, { json } from "express";
import { PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import authRoute from "./routes/auth.route";

const app = express();

// configuration
app.use(json());

// routes
app.use("/api/v1/auth", authRoute);

// handle error secara umum
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server up on port ${PORT}`);
});
