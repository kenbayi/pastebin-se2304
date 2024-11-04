import { Router } from "express";

import { authenticateToken } from "../middleware/authMiddleware";

import { getDeleted } from "../controller/paste-management/getDeleted";

const router = Router();


router.get("/deleted/:userId", authenticateToken, getDeleted);

export default router;
