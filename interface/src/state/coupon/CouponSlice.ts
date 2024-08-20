import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the coupon state interface
interface CouponState {
  couponId: string;
  AggregatorType: string;
  expirationTime: string;
  couponCode: string;
  affiliateUrl: string;
  termsAndConditions: string;
  CouponPunchLine: string;
  description: string;
}

// Define the initial state
const initialState: CouponState[] = [];

export const fillcategories = createAsyncThunk(
  "Coupon/fillcategories",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/coupon`);
    return response.data.coupons;
  }
);

export const filterByCategory = createAsyncThunk(
  "Coupon/filterByCategory",
  async (category: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/coupon?category=${category}`
    );
    return response.data.coupons;
  }
);
export const filterbyStore=createAsyncThunk(
  "Coupon/filterBystore",
  async (store: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/coupon?store=${store}`
    );
    return response.data.coupons;
  }
);
const couponSlice = createSlice({
  name: "Coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fillcategories.pending, () => {
        // Handle loading state if needed
      })
      .addCase(
        fillcategories.fulfilled,
        (state, action: PayloadAction<CouponState[]>) => {
          // Replace the state with the fetched coupons
          return action.payload.map((coupon) => ({
            ...coupon,
            // Ensure dates are kept as strings
            expirationTime: new Date(coupon.expirationTime).toISOString(),
          }));
        }
      )
      .addCase(fillcategories.rejected, () => {
        // Handle the rejected state if needed
      })
      .addCase(filterByCategory.pending, () => {
        // Handle loading state if needed
      })
      .addCase(
        filterByCategory.fulfilled,
        (state, action: PayloadAction<CouponState[]>) => {
          // Replace the state with the fetched coupons filtered by category
          return action.payload.map((coupon) => ({
            ...coupon,
            // Ensure dates are kept as strings
            expirationTime: new Date(coupon.expirationTime).toISOString(),
          }));
        }
      )
      .addCase(filterByCategory.rejected, () => {
        // Handle the rejected state if needed
      });
  },
});

export default couponSlice.reducer;
