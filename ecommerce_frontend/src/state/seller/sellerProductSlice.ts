// import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
// import { api } from "../../config/api";
// import { Product } from "../../type/productType";

// export const fetchSellerProducts = createAsyncThunk<Product[],any>(
//     "/sellerProduct/fetchSellerProducts",
//     async(jwt,{rejectWithValue})=>{
//         try{
//             const response = await api.get(`/sellers/products`,{
//                 headers:{
//                     Authorization:`Bearer ${jwt}`,
//                 },
//             })
//             const data = response.data;

//             console.log("seller products-",data);
//             return data;
//         } catch(error){
//             console.log("error..",error);
//             throw error;
//         }
//     }
// )

// export const createProduct = createAsyncThunk<Product,{request:any,jwt:string | null}>(
//     "/sellerProduct/createProduct",
//     async(args,{rejectWithValue})=>{
//         const {request,jwt} = args;
//         try{
//             const response = await api.post(`/`,request,{
//                 headers:{
//                     Authorization:`Bearer ${jwt}`,
//                 },
//             })
//              console.log("product created-",response.data);
//             return response.data;
//         } catch(error){
//             console.log("error..",error);
//             // throw error;
//         }
//     }
// )


// export const toggleStock = createAsyncThunk(
//   "seller/toggleStock",
//   async ({ productId, stockStatus, jwt }: any) => {
//     const response = await api.put(
//       `/sellers/products/${productId}/stock`,
//       JSON.stringify({ stockStatus }),
//       {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   }
// );




// interface SellerProductState{
//     products:Product[];
//     loading:boolean;
//     error:string|null|undefined;

// }

// const initialState:SellerProductState={
//     products:[],
//     loading:false,
//     error:null
// }

// const sellerProductSlice = createSlice({
//     name:"sellerProduct",
//     initialState,
//     reducers:{},
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchSellerProducts.pending, (state) => {
//             state.loading = true;
//         })
//         .addCase(fetchSellerProducts.fulfilled, (state, action) => {
//             state.loading = false;
//             state.products = action.payload;
//         })
//         .addCase(fetchSellerProducts.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message ?? "Something went wrong";
//         })

//         .addCase(createProduct.pending, (state) => {
//             state.loading = true;
//         })
//         .addCase(createProduct.fulfilled, (state, action) => {
//             state.loading = false;
//             state.products.push(action.payload);
//         })
//         .addCase(createProduct.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message ?? "Something went wrong";
//         })
//         .addCase(toggleStock.fulfilled, (state, action) => {
//   const index = state.products.findIndex(p => p.id === action.payload.id);
//   if (index !== -1) {
//     state.products[index] = action.payload;
//   }
// });

//     }
// });

// export default sellerProductSlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Product } from "../../type/productType";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "/sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get(`/sellers/products`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const data = response.data;
            console.log("seller products-", data);
            return data;
        } catch (error) {
            console.log("error..", error);
            throw error;
        }
    }
);

// -------------------------------------------------------------------
// 🎯 FIX APPLIED HERE: The endpoint URL has been changed from `/` to 
// `/sellers/products` to correctly route the POST request.
// -------------------------------------------------------------------
export const createProduct = createAsyncThunk<Product, { request: any, jwt: string | null }>(
    "/sellerProduct/createProduct",
    async (args, { rejectWithValue }) => {
        const { request, jwt } = args;
        try {
            // ✅ CORRECTION: Changed the path from `/` to `/sellers/products`
            const response = await api.post(`/sellers/products`, request, { 
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json", // Added for clarity/safety
                },
            });
            console.log("product created-", response.data);
            return response.data;
        } catch (error) {
            console.log("error..", error);
            // It's generally better to throw the error to trigger the .rejected case
            // If you want to return a value on failure, use rejectWithValue
            // return rejectWithValue(error.message); 
        }
    }
);


export const toggleStock = createAsyncThunk(
    "seller/toggleStock",
    async ({ productId, stockStatus, jwt }: any) => {
        const response = await api.put(
            `/sellers/products/${productId}/stock`,
            // JSON.stringify is often unnecessary with Axios, 
            // but keeping it for consistency if `api` is a custom wrapper.
            JSON.stringify({ stockStatus }), 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    }
);

// -----------------------------
// State and Slice (No changes needed here)
// -----------------------------

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null
}

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong";
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to create product.";
            })
            .addCase(toggleStock.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    // Update the existing product with the response payload
                    state.products[index] = action.payload; 
                }
            });
    }
});

export default sellerProductSlice.reducer;
