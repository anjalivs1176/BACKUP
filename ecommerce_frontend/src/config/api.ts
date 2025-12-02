// import axios from "axios"

// export const API_URL = "http://localhost:8080"

// export const api = axios.create({
//     baseURL:API_URL,
//     headers:{
//         "Content-Type":"Application/json"
//     }
// })


// src/config/api.ts
import axios from "axios";

export const API_URL = "http://localhost:8080";

export const api = axios.create({
  baseURL: API_URL,
  // do NOT set global Content-Type here — let each request set it if needed.
});

// Public routes that must not get Authorization header
const PUBLIC_PREFIXES = [
  "/seller/login",
  "/seller/verify",
  // "/seller/",
  // "/auth",
];

// Attach JWT only for non-public routes
// api.interceptors.request.use((config) => {
//   const url = config.url || "";

//   // if request url begins with a public prefix, don't add token
//   if (PUBLIC_PREFIXES.some((p) => url.startsWith(p))) {
//     return config;
//   }

//   const token = localStorage.getItem("jwt");
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


api.interceptors.request.use((config) => {
  const url = config.url || "";

  const PUBLIC_PREFIXES = [
    "/seller/login",
    "/seller/verify",
  ];

  if (!PUBLIC_PREFIXES.some((p) => url.startsWith(p))) {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
