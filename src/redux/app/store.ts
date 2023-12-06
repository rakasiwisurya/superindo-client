import { configureStore } from "@reduxjs/toolkit";
import { authReducer, dashboardReducer, productCategoryReducer, productReducer } from "../features";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
