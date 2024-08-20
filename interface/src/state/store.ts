import { configureStore } from "@reduxjs/toolkit";
import CouponReducer from "./coupon/CouponSlice";
export const Store = configureStore({
  reducer: {
    coupon: CouponReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
