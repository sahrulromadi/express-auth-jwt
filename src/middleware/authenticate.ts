// file ini berfungsi untuk mengecek apakah user sudah login atau belum dengan mengecek accessToken dari jwt

import { Request, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";
import AppError from "../utils/AppError";

// membuat interface untuk menambahkan userId ke dalam req yang bisa diakses dengan AuthRequest
export interface AuthRequest extends Request {
  userId?: number;
}

const authenticate: RequestHandler = (req: AuthRequest, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw new AppError(401, "unauthorized");

  // verifikasi token
  try {
    const decoded = verifyAccessToken(accessToken) as { userId: number };

    // set userId yg berhasil di verifikasi ke dalam req.userId
    req.userId = decoded.userId;

    next();
  } catch (error) {
    throw new AppError(403, "forbidden");
  }
};

export default authenticate;
