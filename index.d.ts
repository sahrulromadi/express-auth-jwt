import { User } from "@prisma/client";

// menambahkan userId ke request sehingga bisa menggunakan req.userId
declare module "express-serve-static-core" {
  interface Request {
    userId: User["id"];
  }
}
