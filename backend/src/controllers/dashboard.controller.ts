import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDashboardData } from "../services/dashboard.service";

export const getDashboard = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const data = await getDashboardData(req.userId);

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to load dashboard data",
        });
    }
};