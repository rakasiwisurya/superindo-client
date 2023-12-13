import { TCartState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TCartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts = [...state.carts, action.payload];
    },
    deleteCart: (state, action) => {
      state.carts = state.carts.filter((cart) => cart?.id !== action.payload?.id);
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addCart, deleteCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
