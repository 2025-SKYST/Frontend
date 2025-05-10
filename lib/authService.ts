// lib/authService.ts
export interface SignUpPayload {
  username:     string
  login_id:     string
  password:     string
  birth_year:   number
  birth_month:  number
  birth_date:    number
  birth_hour:   number
  birth_minute: number
}
export interface SignInPayload {
  login_id: string;
  password: string;
}

export async function signUp(payload: SignUpPayload) {
  const res = await fetch(
    "https://api.memory123.store/api/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  )
  if (!res.ok) throw new Error(`SignUp failed: ${res.status}`)
  return res.json() as Promise<{ accessToken: string }>
}

export async function signIn(payload: SignInPayload) {
  const res = await fetch(
    "https://api.memory123.store/api/users/signin",
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );
  if (!res.ok) throw new Error(`SignIn failed: ${res.status}`);
  // { accessToken: string, refreshToken: string }
  return res.json() as Promise<{ accessToken: string; refreshToken: string }>;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(
    "https://api.memory123.store/api/users/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
  return res.json() as Promise<{ accessToken: string; refreshToken?: string }>;
}

export function signOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}