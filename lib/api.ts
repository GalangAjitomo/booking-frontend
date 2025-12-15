import { getToken, logout } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  console.log("[API] Request:", path);
  console.log("[API] Token:", token);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  console.log("[API] Status:", res.status);

  if (res.status === 401) {
    console.warn("[API] Unauthorized");
    logout();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Request failed");
  }

  return res.json() as Promise<T>;
}
