import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import fileUpload from "../../controllers/fileupload/fileupload.js";

const router = Router();

router.post('/upload',isAuthenticated("user&admin") , fileUpload);

export default router;
