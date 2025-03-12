import { RequestHandler } from "express";
import { OK, CREATED } from "../constants/http";
import { createAccount, loginUser } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validations/auth.schema";

/**
 * register
 * @route POST /api/v1/auth/register
 * @bodyparam {string} email
 * @bodyparam {string} password
 */
export const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const validatedBody = registerSchema.parse(req.body);
    const newUser = await createAccount(validatedBody);

    res.status(CREATED).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * login
 * @route POST /api/v1/auth/login
 * @bodyparam {string} email
 * @bodyparam {string} password
 */
export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const validatedBody = loginSchema.parse(req.body);
    const user = await loginUser(validatedBody);

    res.status(OK).json({
      success: true,
      ...user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * testing middleware authenticate
 * @route GET /api/v1/auth/test
 * @middleware authenticate
 */
export const testHandler: RequestHandler = (req, res, next) => {
  try {
    res.status(OK).send("berhasil masuk");
  } catch (error) {
    next(error);
  }
};
