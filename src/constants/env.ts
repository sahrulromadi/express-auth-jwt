// file ini akan mendeklarasikan env sebagai variabel

import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "3001";
