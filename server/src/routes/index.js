import { Router } from "express";

import test from "./test.js";
import users from "./users.js";

const router = Router();

router.use("/test", test);
router.use("/users", users);

export default router;
