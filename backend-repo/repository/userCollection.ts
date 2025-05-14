import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

export const userCollection = db.collection('users');

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }

    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (err) {
    throw err;
  }
}

export const createUser = async (userId: string, firebaseUser: UserRecord): Promise<User> => {
  const newUser: User = {
    id: userId,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
    recentlyActive: Math.floor(Date.now() / 1000),
  };

  // Set new user document in Firestore
  await userCollection.doc(userId).set(newUser);
  return newUser;
}

export const setUserRecentlyActive = async (userId: string) => {
  await userCollection.doc(userId).update({
    recentlyActive: Math.floor(Date.now() / 1000),
  });
}