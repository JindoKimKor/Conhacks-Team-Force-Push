import { Router } from "express";

import goals from "./goals.js";
import users from "./users.js";

const router = Router();

router.use("/goals", goals);
router.use("/users", users);

export default router;
