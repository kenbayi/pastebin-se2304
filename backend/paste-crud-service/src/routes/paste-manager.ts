import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { getDeleted } from "../controller/paste-management/getDeleted";
import createPaste from "../controller/paste-management/pasteCreateController";

const router = Router();

router.post("/create", authenticateToken, createPaste); 
router.get("/deleted/:userId", authenticateToken, getDeleted);

export default router;