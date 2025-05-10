// lib/authService.ts
export interface SignUpPayload {
  username:     string
  birth_year:   number
  birth_month:  number
  birth_day:    number
  birth_hour:   number
  birth_minute: number
  login_id:     string
  password:     string
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

export async function refreshAccessToken() {
  const res = await fetch(
    "https://api.memory123.store/api/users/refresh",
    {
      method: "POST",
      credentials: "include",
    }
  )
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`)
  return res.json() as Promise<{ accessToken: string }>
}

export function signOut() {
  // 필요하다면 서버에 logout 요청을 추가
  localStorage.removeItem("accessToken")
}
