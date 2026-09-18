import { z } from "zod";

export const inventorySchema = z.object({
    name: z.string().min(1, "Name is required"),

    category: z.string().min(1, "Category is required"),

    quantity: z.number().positive("Quantity must be greater than 0"),

    unit: z.string().min(1, "Unit is required"),

    price: z.number().nonnegative("Price cannot be negative"),

    lowStockThreshold: z.number().nonnegative("Threshold cannot be negative"),

    purchaseDate: z.coerce.date(),

    expiryDate: z.coerce.date().nullable().optional(),
});

export const inventoryUpdateSchema = z.object({
    name: z.string().min(1, "Name cannot be empty").optional(),

    category: z.string().min(1, "Category cannot be empty").optional(),

    quantity: z.number().positive("Quantity must be greater than 0").optional(),

    unit: z.string().min(1, "Unit cannot be empty").optional(),

    price: z.number().nonnegative("Price cannot be negative").optional(),

    lowStockThreshold: z.number().nonnegative("Threshold cannot be negative").optional(),

    purchaseDate: z.coerce.date().optional(),

    expiryDate: z.coerce.date().nullable().optional(),
});