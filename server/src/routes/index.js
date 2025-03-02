import { Router } from "express";

import buyItem from "../services/buyItem.js";
import generate from "./generate.js";
import goals from "./goals.js";
import items from "./items.js";
import perks from "./perks.js";
import turtles from "./turtles.js";
import users from "./users.js";

const router = Router();

router.use("/goals", goals);
router.use("/users", users);
router.use("/perks", perks);
router.use("/generate", generate);
router.use("/turtles", turtles);
router.use("/items", items);
router.use("/buyItem", buyItem);

export default router;
