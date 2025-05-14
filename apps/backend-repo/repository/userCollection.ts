import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { db } from "../config/firebaseConfig";
import { User } from "@ebuddy/entities";

export const userCollection = db.collection("users");

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
};

export const createUser = async (
  userId: string,
  firebaseUser: UserRecord
): Promise<User> => {
  const newUser: User = {
    id: userId,
    name: firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
    recentlyActive: Math.floor(Date.now() / 1000),
  };

  // Set new user document in Firestore
  await userCollection.doc(userId).set(newUser);
  return newUser;
};

export const setUserRecentlyActive = async (userId: string) => {
  await userCollection.doc(userId).update({
    recentlyActive: Math.floor(Date.now() / 1000),
  });
};

export const updateUser = async (
  userId: string,
  body: Partial<Omit<User, "id">>
): Promise<User | null> => {
  try {
    console.log('body', body);
    const { name, email, totalAverageWeightRatings, numberOfRents } = body;
    const updatedUserData: any = {};

    if (name) updatedUserData.name = name;
    if (email) updatedUserData.email = email;
    if (totalAverageWeightRatings)
      updatedUserData.totalAverageWeightRatings = totalAverageWeightRatings;
    if (numberOfRents) updatedUserData.numberOfRents = numberOfRents;

    await userCollection.doc(userId).update(updatedUserData);
    await setUserRecentlyActive(userId);

    return await getUserById(userId);
  } catch (err) {
    throw err;
  }
};
