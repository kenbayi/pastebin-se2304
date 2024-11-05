import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { getDeleted } from "../controller/paste-management/getDeleted";
import createPaste from "../controller/paste-management/pasteCreateController";
import UndoDeletePasteController  from "../controller/paste-management/undoDeleteController";
import DeletePasteController from "../controller/paste-management/pasteDeleteController";
import getPaste from "../controller/paste-management/getPaste";
import getAllPastes from "../controller/paste-management/getAllPastes";
import getPasteByUser from "../controller/paste-management/getPasteByUser";

const router = Router();

router.post("/create", authenticateToken, createPaste); 
router.get("/deleted/:userId", authenticateToken, getDeleted);
router.post("/undo/:pasteId", authenticateToken, UndoDeletePasteController.undoDelete);
router.delete("/delete/:pasteId",authenticateToken, DeletePasteController.deletePaste); 
router.get("/get/:hash",authenticateToken, getPaste);
router.get("/getAll", authenticateToken, getAllPastes );
router.get("/getPasteByUser/:id", authenticateToken, getPasteByUser);

export default router;