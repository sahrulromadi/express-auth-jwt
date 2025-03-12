import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  testHandler,
} from "../controllers/auth.controller";
import authenticate from "../middleware/authenticate";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/test", authenticate, testHandler);

export default router;
