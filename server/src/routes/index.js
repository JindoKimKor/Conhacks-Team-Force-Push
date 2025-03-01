import { Router } from "express";

import goals from "./goals.js";

const router = Router();

router.use("/goals", goals);

export default router;
