// utils/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export const apiFetch = async (
  method: ApiMethod,
  endpoint: string,
  body?: object
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: getAuthHeaders(),
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
