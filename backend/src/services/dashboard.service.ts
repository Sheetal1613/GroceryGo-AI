import prisma from "../config/prisma";

const MS_PER_DAY = 86_400_000;

const startOfDay = (date: Date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

const getDaysUntil = (expiryDate: Date, today: Date) => {
    const expiry = startOfDay(expiryDate);
    const currentDay = startOfDay(today);

    return Math.ceil(
        (expiry.getTime() - currentDay.getTime()) / MS_PER_DAY
    );
};

export const getDashboardData = async (userId: number) => {
    const inventory = await prisma.inventory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    const today = new Date();

    // -----------------------------
    // Total inventory
    // -----------------------------

    const totalInventoryItems = inventory.length;

    // -----------------------------
    // Expiring soon
    // 0-7 days from today
    // -----------------------------

    const expiringSoonItems = inventory.filter((item) => {
        if (!item.expiryDate) return false;

        const daysUntil = getDaysUntil(item.expiryDate, today);

        return daysUntil >= 0 && daysUntil <= 7;
    });

    // -----------------------------
    // Low stock
    // quantity > 0 and <= threshold
    // -----------------------------

    const lowStockItems = inventory.filter((item) => {
        return (
            item.quantity > 0 &&
            item.quantity <= item.lowStockThreshold
        );
    });

    // -----------------------------
    // Out of stock
    // -----------------------------

    const outOfStockItems = inventory.filter((item) => {
        return item.quantity <= 0;
    });

    // -----------------------------
    // Current month spending
    // -----------------------------

    const monthStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const nextMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
    );

    const monthlySpending = inventory
        .filter((item) => {
            return (
                item.purchaseDate >= monthStart &&
                item.purchaseDate < nextMonthStart
            );
        })
        .reduce((total, item) => {
            return total + item.price;
        }, 0);

    // -----------------------------
    // Spending by category
    // -----------------------------

    const categorySpendingMap = new Map<string, number>();

    inventory
        .filter((item) => {
            return (
                item.purchaseDate >= monthStart &&
                item.purchaseDate < nextMonthStart
            );
        })
        .forEach((item) => {
            const current =
                categorySpendingMap.get(item.category) ?? 0;

            categorySpendingMap.set(
                item.category,
                current + item.price
            );
        });

    const categorySpending = Array.from(
        categorySpendingMap.entries()
    ).map(([name, value]) => ({
        name,
        value,
    }));

    return {
        totalInventoryItems,
        expiringSoonCount: expiringSoonItems.length,
        monthlySpending,
        lowStockItems,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
        categorySpending,
    };
};