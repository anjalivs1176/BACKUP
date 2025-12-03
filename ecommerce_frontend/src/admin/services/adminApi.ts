// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const adminApi = {
//   getSellers: (status?: string) =>
//     api.get(`/admin/sellers`, {
//       params: { status },
//     }),

//   updateSellerStatus: (id: number, status: string) =>
//     api.put(`/admin/sellers/${id}/status`, { status }),


// getCoupons: () => axios.get("/api/admin/coupons"),

//   deleteCoupon: (id: number) => axios.delete(`/api/admin/coupons/${id}`),

//   createCoupon: (data:any) => axios.post("/api/admin/coupons", data),

// };



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
  // Sellers
  getSellers: (status?: string) =>
    api.get(`/admin/sellers`, {
      params: { status },
    }),

  updateSellerStatus: (id: number, status: string) =>
    api.put(`/admin/sellers/${id}/status`, { status }),

  // Coupons (UPDATED)
  getCoupons: () => api.get("/coupons/admin/all"),
  deleteCoupon: (id: number) => api.delete(`/coupons/admin/delete/${id}`),
  createCoupon: (data: any) => api.post("/coupons/admin/create", data),
};

