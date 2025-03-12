import { User } from "@prisma/client";
import prisma from "../config/prisma";
import AppError from "../utils/AppError";
import { BAD_REQUEST } from "../constants/http";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken } from "../utils/jwt";

export const checkUser = async (userPayload: Pick<User, "email">) => {
  // cek apakah user tersebut sudah ada berdasarkan email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userPayload.email,
    },
  });

  return existingUser;
};

export const createAccount = async (userPayload: Omit<User, "id">) => {
  // cek apakah user sudah tersedia di database
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

export const loginUser = async (userPayload: Omit<User, "id">) => {
  // cek apakah user tersedia
  const user = await checkUser(userPayload);
  if (!user) throw new AppError(BAD_REQUEST, "user not found");

  // cek password
  const isPasswordMatch = await comparePassword(
    userPayload.password,
    user.password
  );
  if (!isPasswordMatch) throw new AppError(BAD_REQUEST, "password not match");

  // generate access token
  const accessToken = generateAccessToken(user.id);

  // login berhasil
  return {
    data: {
      id: user.id,
      email: user.email,
    },
    token: accessToken,
  };
};
