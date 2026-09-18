import { Router } from "express";
import {
    createInventory,
    getInventory,
    getInventoryItem,
    updateInventory,
    deleteInventory,
} from "../controllers/inventory.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateToken, createInventory);
router.get("/", authenticateToken, getInventory);
router.get("/:id", authenticateToken, getInventoryItem);
router.put("/:id", authenticateToken, updateInventory);
router.delete("/:id", authenticateToken, deleteInventory);

export default router;