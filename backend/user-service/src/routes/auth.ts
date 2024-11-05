import {Router} from "express";
import signupController from "../controller/auth/signup";
import loginController from "../controller/auth/login";
import checkController from "../controller/auth/check";
import logoutController from "../controller/auth/logout";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check", checkController);
router.post("/logout", logoutController);

export default router;