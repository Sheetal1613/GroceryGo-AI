import { inventorySchema, inventoryUpdateSchema } from "../validators/inventory.validator";
import { Request, Response } from "express";
import {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
} from "../services/inventory.service";

export const createInventory = async (
    req: Request,
    res: Response
) => {
    try {
        const result = inventorySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inventory data",
                errors: result.error.issues,
            });
        }

        const item = await createInventoryItem(result.data);

        res.status(201).json(item);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create inventory item",
        });
    }
};

export const getInventory = async (
    _req: Request,
    res: Response
) => {
    try {
        const items = await getAllInventoryItems();

        res.status(200).json(items);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch inventory items",
        });
    }
};

export const getInventoryItem = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const item = await getInventoryItemById(id);

        if (!item) {
            return res.status(404).json({
                message: "Inventory item not found",
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch inventory item",
        });
    }
};

export const updateInventory = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const result = inventoryUpdateSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid inventory update data",
                errors: result.error.issues,
            });
        }

        const item = await updateInventoryItem(id, result.data);

        res.status(200).json(item);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update inventory item",
        });
    }
};

export const deleteInventory = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const item = await deleteInventoryItem(id);

        res.status(200).json({
            message: "Inventory item deleted successfully",
            item,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete inventory item",
        });
    }
};