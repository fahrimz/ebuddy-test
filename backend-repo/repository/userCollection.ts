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

