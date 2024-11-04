import {Router} from "express";
import signupController from "../controller/auth/signup";

const router = Router();

router.post("/signup", signupController);

export default router;