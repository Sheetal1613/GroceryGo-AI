import { Response } from "express";
import {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
} from "../services/inventory.service";
import {
    inventorySchema,
    inventoryUpdateSchema,
} from "../validators/inventory.validator";
import { AuthRequest } from "../middleware/auth.middleware";

export const createInventory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result = inventorySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inventory data",
                errors: result.error.issues,
            });
        }

        const item = await createInventoryItem(
            req.userId,
            result.data
        );

        return res.status(201).json(item);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create inventory item",
        });
    }
};

export const getInventory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const items = await getAllInventoryItems(req.userId);

        return res.status(200).json(items);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch inventory items",
        });
    }
};

export const getInventoryItem = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const id = Number(req.params.id);

        const item = await getInventoryItemById(
            req.userId,
            id
        );

        if (!item) {
            return res.status(404).json({
                message: "Inventory item not found",
            });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch inventory item",
        });
    }
};

export const updateInventory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const id = Number(req.params.id);

        const result = inventoryUpdateSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inventory update data",
                errors: result.error.issues,
            });
        }

        const resultUpdate = await updateInventoryItem(
            req.userId,
            id,
            result.data
        );

        if (resultUpdate.count === 0) {
            return res.status(404).json({
                message: "Inventory item not found",
            });
        }

        const updatedItem = await getInventoryItemById(
            req.userId,
            id
        );

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update inventory item",
        });
    }
};

export const deleteInventory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const id = Number(req.params.id);

        const result = await deleteInventoryItem(
            req.userId,
            id
        );

        if (result.count === 0) {
            return res.status(404).json({
                message: "Inventory item not found",
            });
        }

        return res.status(200).json({
            message: "Inventory item deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete inventory item",
        });
    }
};