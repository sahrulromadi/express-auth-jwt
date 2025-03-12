import { User } from "@prisma/client";
import prisma from "../config/prisma";
import AppError from "../utils/AppError";
import { BAD_REQUEST } from "../constants/http";
import { hashPassword } from "../config/bcrypt";

export const checkUser = async (userPayload: Pick<User, "email">) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userPayload.email,
    },
  });

  return existingUser;
};

export const createAccount = async (userPayload: Omit<User, "id">) => {
  // cek apakah user sudah tersedia
  const existingUser = await checkUser(userPayload);
  if (existingUser) throw new AppError(BAD_REQUEST, "user already exists");

  // hash password
  const hashedPassword = await hashPassword(userPayload.password);

  // create user
  const newUser = await prisma.user.create({
    data: {
      email: userPayload.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return newUser;
};
