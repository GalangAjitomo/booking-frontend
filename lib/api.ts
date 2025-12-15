import { logout } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Request failed");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
