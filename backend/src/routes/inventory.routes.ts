import { Router } from "express";
import { createInventory } from "../controllers/inventory.controller";

const router = Router();

router.post("/", createInventory);

export default router;