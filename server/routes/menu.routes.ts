import express from "express";

import { addMenu, editMenu } from "../controller/menu.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.mid";
import { upload } from "../middleware/multer";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("image"), editMenu);

export default router;
