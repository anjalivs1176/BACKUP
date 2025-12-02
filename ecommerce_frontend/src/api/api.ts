import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 🔥 Public routes that MUST NOT include token
const PUBLIC_ROUTES = [
  "/seller/login",
  "/seller/verify",
  "/seller",
  "/auth",
];

api.interceptors.request.use((config) => {
  const url = config.url || "";

  // ❌ If the request is public → do NOT attach token
  if (PUBLIC_ROUTES.some((route) => url.startsWith(route))) {
    // console.log("PUBLIC ROUTE — no token added:", url);
    return config;
  }

  // ✅ For protected routes → attach token
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
