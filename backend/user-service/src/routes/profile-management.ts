import {Router} from "express";
import requestController from "../controller/profile-management/request-reset";
import resetController from "../controller/profile-management/reset-password";

const router = Router();

router.post("/request-password", requestController);
router.post("/reset-password", resetController);


export default router;