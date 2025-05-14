import express from "express";
import { fetchUserData, updateUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get('/fetch-user-data', authMiddleware, fetchUserData);
userRoutes.post('/update-user-data', authMiddleware, updateUserData);

export default userRoutes;