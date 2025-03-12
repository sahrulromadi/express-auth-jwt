import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_KEY } from "../constants/env";
import { oneHour } from "./date";

export const generateAccessToken = (id: number) => {
  return jwt.sign(
    {
      userId: id,
    },
    JWT_ACCESS_TOKEN_KEY,
    {
      expiresIn: oneHour,
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_TOKEN_KEY);
};
