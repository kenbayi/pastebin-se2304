import {Router} from "express";
import requestController from "../controller/profile-management/request-reset";

const router = Router();

router.post("/request-password", requestController);

export default router;