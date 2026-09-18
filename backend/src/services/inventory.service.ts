import prisma from "../config/prisma";

export const createInventoryItem = async (
    userId: number,
    data: {
        name: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        lowStockThreshold: number;
        purchaseDate: Date;
        expiryDate?: Date | null;
    }
) => {
    const item = await prisma.inventory.create({
        data: {
            ...data,
            userId,
        },
    });

    return item;
};

export const getAllInventoryItems = async (userId: number) => {
    return await prisma.inventory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};

export const getInventoryItemById = async (
    userId: number,
    id: number
) => {
    return await prisma.inventory.findFirst({
        where: {
            id,
            userId,
        },
    });
};

export const updateInventoryItem = async (
    userId: number,
    id: number,
    data: {
        name?: string;
        category?: string;
        quantity?: number;
        unit?: string;
        price?: number;
        lowStockThreshold?: number;
        purchaseDate?: Date;
        expiryDate?: Date | null;
    }
) => {
    return await prisma.inventory.updateMany({
        where: {
            id,
            userId,
        },
        data,
    });
};

export const deleteInventoryItem = async (
    userId: number,
    id: number
) => {
    return await prisma.inventory.deleteMany({
        where: {
            id,
            userId,
        },
    });
};