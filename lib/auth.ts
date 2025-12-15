export type AuthUser = {
  id: string;
  userName: string;
  roles: string[];
};

// =========================
// TOKEN
// =========================
export function getToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

// =========================
// USER
// =========================
export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    return {
      id: String(parsed.id),
      userName: String(parsed.userName),
      roles: Array.isArray(parsed.roles) ? parsed.roles : [],
    };
  } catch {
    return null;
  }
}

// =========================
// LOGOUT
// =========================
export function logout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } finally {
    window.location.href = "/login";
  }
}
