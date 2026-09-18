import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerUser, loginUser } from "../services/auth.service";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid registration data",
                errors: result.error.issues,
            });
        }

        const user = await registerUser(
            result.data.name,
            result.data.email,
            result.data.password
        );

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message === "USER_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        return res.status(500).json({
            message: "Failed to register user",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid login data",
                errors: result.error.issues,
            });
        }

        const user = await loginUser(
            result.data.email,
            result.data.password
        );

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        return res.status(500).json({
            message: "Failed to login",
        });
    }
};