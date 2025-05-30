import { NextFunction, Request, Response } from "express";
import admin from "../config/firebaseConfig";
import { LoginError } from "@ebuddy/entities";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: LoginError.NO_TOKEN_PROVIDED });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body = req.body || {}; // ensure body exists
    req.body.uid = decodedToken.uid;
    next();
  } catch (err) {
    res.status(401).json({ error: LoginError.INVALID_TOKEN });
  }
}