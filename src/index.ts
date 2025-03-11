import express from "express";
import { PORT } from "./constans/env";

const app = express();

app.listen(PORT, () => {
  console.log(`server up on port ${PORT}`);
});
