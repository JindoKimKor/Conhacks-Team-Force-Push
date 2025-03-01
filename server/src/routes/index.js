import { Router } from "express";

import goals from "./goals.js";
import users from "./users.js";
import perks from "./perks.js";

const router = Router();

router.use("/goals", goals);
router.use("/users", users);
router.use("/perks", perks);

export default router;
