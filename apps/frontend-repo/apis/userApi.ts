import { apiFetch } from "./api";
import { User } from "@ebuddy/entities";

export const fetchUserData = async (): Promise<User> => {
  return apiFetch("GET", "/fetch-user-data");
};

export const updateUserData = async (
  userData: Partial<User>
): Promise<User> => {
  return apiFetch("POST", "/update-user-data", { ...userData });
};
