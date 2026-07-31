import { Request, Response } from "express";
import { createInventoryItem } from "../services/inventory.service";

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