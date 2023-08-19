import express from "express";
import { userSignup } from "../controllers/signup.controller";
import { userLogin } from "../controllers/signin.controller";
const router = express.Router();

router.post("/api/v1/signup", userSignup);
router.post("/api/v1/signin", userLogin);
export { router as authRouter };
