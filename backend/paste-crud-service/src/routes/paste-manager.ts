import { Router } from "express";
import { createPaste } from "../controller/paste-management/pasteCreateController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authenticateToken, createPaste); 


export default router;
