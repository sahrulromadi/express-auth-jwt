import { Request, Response, NextFunction } from "express";
import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.service";
import { registerSchema } from "../validations/auth.schema";

/**
 * register
 * @route POST /api/v1/auth/register
 * @bodyparam {string} email
 * @bodyparam {string} password
 */
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
