import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  // ---------------- SELLERS ----------------
  getSellers: (status?: string) =>
    api.get(`/admin/sellers`, { params: { status } }),

  updateSellerStatus: (id: number, status: string) =>
    api.put(`/admin/sellers/${id}/status`, { status }),

  // ---------------- COUPONS ----------------
  getCoupons: () => api.get("/coupons/admin/all"),
  deleteCoupon: (id: number) => api.delete(`/coupons/admin/delete/${id}`),
  createCoupon: (data: any) => api.post("/coupons/admin/create", data),

  // ---------------- HOME CATEGORIES ----------------
  // getHomeCategories: () => api.get("/admin/home-category"),

  // deleteHomeCategory: (id: number) =>
  //   api.delete(`/admin/home-category/${id}`),

  // // ⭐ Correct backend path + wrap data in array
  // createHomeCategory: (data: any) =>
  //   api.post("/home/categories", [data]),



// ---------------- HOME CATEGORIES ----------------
getHomeCategories: () => api.get("/admin/home-category"),

createHomeCategory: (data: any) =>
  api.post("/admin/home-category", data),

updateHomeCategory: (id: number, data: any) =>
  api.patch(`/admin/home-category/${id}`, data),

deleteHomeCategory: (id: number) =>
  api.delete(`/admin/home-category/${id}`),





};
