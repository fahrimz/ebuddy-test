import { Request, Response } from "express";
import { FirebaseApp } from "firebase/app";
import { getUserById } from "../repository/userCollection";

export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.uid;
    if (!userId) {
      res.status(400).json({ error: 'User ID is required'});
      return;
    }

    const userData = await getUserById(userId);
    if (!userData) {
      res.status(404).json({ error: 'User not found'});
      return;
    }

    res.status(200).json(userData);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user data'});
    return;
  }
}
