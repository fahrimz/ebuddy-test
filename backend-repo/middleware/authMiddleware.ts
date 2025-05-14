import { NextFunction, Request, Response } from "express";
import admin from "../config/firebaseConfig";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').filter(x => x != "Bearer")[0];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: No Token provided'});
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.uid = decodedToken.uid;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}