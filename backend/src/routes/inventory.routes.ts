import { Router } from "express";
import {
    createInventory,
    getInventory,
    getInventoryItem,
    updateInventory,
} from "../controllers/inventory.controller";

const router = Router();

router.post("/", createInventory);
router.get("/", getInventory);
router.get("/:id", getInventoryItem);
router.put("/:id", updateInventory);

export default router;