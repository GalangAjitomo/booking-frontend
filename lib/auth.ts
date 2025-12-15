export type AuthUser = {
  id: string;
  userName: string;
  roles: string[];
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}


export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    return {
      id: parsed.id,
      userName: parsed.userName,
      roles: Array.isArray(parsed.roles) ? parsed.roles : [],
    };
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
