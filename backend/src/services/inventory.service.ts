import prisma from "../config/prisma";

export const createInventoryItem = async (data: {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    purchaseDate: Date;
    expiryDate?: Date;
}) => {

    const item = await prisma.inventory.create({
        data,
    });

    return item;
};

export const getAllInventoryItems = async () => {
    return await prisma.inventory.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getInventoryItemById = async (id: number) => {
    return await prisma.inventory.findUnique({
        where: {
            id,
        },
    });
};