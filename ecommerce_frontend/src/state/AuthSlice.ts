import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

// 👉 SEND OTP (LOGIN + SIGNUP)
export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendLoginSignupOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/send/login-signup-otp", {
        email,
        role: "ROLE_SELLER",
        otp: null,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

// 👉 LOGIN SELLER
export const loginSeller = createAsyncThunk(
  "auth/loginSeller",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/seller/login", {
        email,
        otp,
        role: "ROLE_SELLER",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

export const signin = createAsyncThunk<any,any>("/auth/signin",
  async(loginRequest,{rejectWithValue})=>{
    try{
      const response = await api.post("/auth/signin",loginRequest)
      console.log("Login otp", response.data)
    } catch(error){
      console.log("error "+error);
    }
  }
)


export const logout = createAsyncThunk<any,any>("/auth/logout",
  async(navigate, {rejectWithValue})=>{
    try{
      localStorage.clear()
      console.log("logout success")
      navigate("/")
    }catch(error){
      console.log("Error "+ error);
    }
  }
)

interface AuthState {
  message: string | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  message: null,
  loading: false,
  error: null,
  token: localStorage.getItem("jwt") || null,   // 👈 restored from jwt
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSellerError(state) {
      state.error = null;
    },
    logoutSeller(state) {
      state.token = null;
      localStorage.removeItem("jwt");           // 👈 remove jwt on logout
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 SEND OTP
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP sent";
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 📌 LOGIN
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Login successful";
        state.error = null;

        const token = action.payload?.jwt; // 👈 read correct backend key

        if (token) {
          state.token = token;
          localStorage.setItem("jwt", token);     // 👈 save as jwt
          localStorage.setItem("role", "ROLE_SELLER");
        }
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 👉 Export these for UI usage
export const { clearSellerError, logoutSeller } = authSlice.actions;

// 👉 Default export
export default authSlice.reducer;

