import express from "express";
import { fetchUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get('/fetch-user-data', authMiddleware, fetchUserData);

export default userRoutes;