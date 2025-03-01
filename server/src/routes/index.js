import { Router } from "express";

import generate from "./generate.js";
import goals from "./goals.js";
import users from "./users.js";

const router = Router();

router.use("/goals", goals);
router.use("/users", users);
router.use("/generate", generate);

export default router;
