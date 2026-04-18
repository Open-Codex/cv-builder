const BASE_URL = import.meta.env.VITE_API_URL;

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: RequestMethod;
  body?: unknown;
  token?: string;
}

async function apiFetch<T>(
  endpoint: string,
  { method = "GET", body, token }: FetchOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  seniority?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface Cv {
  id: string;
  title: string;
  content: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  developerId: string;
}

export interface CreateCvRequest {
  title: string;
  content?: string;
  isDefault?: boolean;
}

export interface UpdateCvRequest {
  title?: string;
  content?: string;
  isDefault?: boolean;
}

export const authService = {
  login: (dto: LoginRequest) =>
    apiFetch<AuthResponse>("/auth/login", { method: "POST", body: dto }),

  register: (dto: RegisterRequest) =>
    apiFetch<AuthResponse>("/auth/register", { method: "POST", body: dto }),
};

export const cvService = {
  findAll: (userId: string, token: string) => apiFetch<Cv[]>("/cv", { token }),

  findOne: (id: string, token: string) => apiFetch<Cv>(`/cv/${id}`, { token }),

  create: (token: string, dto: CreateCvRequest) =>
    apiFetch<Cv>("/cv", { method: "POST", body: dto, token }),

  update: (id: string, token: string, dto: UpdateCvRequest) =>
    apiFetch<Cv>(`/cv/${id}`, { method: "PATCH", body: dto, token }),

  delete: (id: string, token: string) =>
    apiFetch<void>(`/cv/${id}`, { method: "DELETE", token }),
};
