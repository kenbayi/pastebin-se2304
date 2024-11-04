import { Router } from "express";
import hasherController from "../controller/generate-hash";
import { deleteHash } from "../controller/delete-hash";
import { getPasteId } from "../controller/getPasteid";
import { getHash } from "../controller/getHash";

const router = Router();

router.post("/generate-hash", hasherController);
router.delete("/delete-hash/:pasteId", deleteHash);
router.get("/getPasteId/:hash", getPasteId )
router.get("/getHash/:pasteId", getHash)

export default router;