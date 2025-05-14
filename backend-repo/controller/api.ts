import { Request, Response } from "express";
import { createUser, getUserById, setUserRecentlyActive } from "../repository/userCollection";
import admin from "../config/firebaseConfig";

export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.uid;
    if (!userId) {
      res.status(400).json({ error: 'User ID is required'});
      return;
    }

    // get user data from auth
    const firebaseUser = await admin.auth().getUser(userId);
    if (!firebaseUser) {
      res.status(404).json({ error: 'User not found'});
      return;
    }

    let userData = await getUserById(userId);
    if (!userData) { // user exists but don't have doc yet
      // create initial doc for user
      userData = await createUser(userId, firebaseUser);
    } else {
      await setUserRecentlyActive(userId);
    }

    res.status(200).json(userData);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user data'});
    return;
  }
}
