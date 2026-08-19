import { Router } from "express";
import {
    createInventory,
    getInventory,
    getInventoryItem,
} from "../controllers/inventory.controller";

const router = Router();

router.post("/", createInventory);
router.get("/", getInventory);
router.get("/:id", getInventoryItem);

export default router;