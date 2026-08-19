import { Request, Response } from "express";
import {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById
} from "../services/inventory.service";

export const createInventory = async (
    req: Request,
    res: Response
) => {
    try {
        const item = await createInventoryItem(req.body);

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