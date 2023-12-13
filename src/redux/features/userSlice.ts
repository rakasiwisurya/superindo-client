import { TAsyncThunkPayload, TUserState } from "@/types";
import { requestApi } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserTransactions = createAsyncThunk("getUserTransactions", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/users/transactions`,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

export const getUserTransaction = createAsyncThunk(
  "getUserTransaction",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/users/transactions/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState: TUserState = {
  userTransactions: [],
  isUserTransactionsLoading: true,
  userTransactionsError: null,
  userTransactionsSuccess: null,

  userTransaction: null,
  isUserTransactionLoading: true,
  userTransactionError: null,
  userTransactionSuccess: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserTransactions: (state) => {
      state.isUserTransactionsLoading = true;
      state.userTransactionsError = null;
      state.userTransactionsSuccess = null;
    },
    resetUserTransaction: (state) => {
      state.isUserTransactionLoading = true;
      state.userTransactionError = null;
      state.userTransactionSuccess = null;
    },
    clearUser: (state) => {
      state.userTransactions = [];
      state.isUserTransactionsLoading = true;
      state.userTransactionsError = null;
      state.userTransactionsSuccess = null;

      state.userTransaction = [];
      state.isUserTransactionLoading = true;
      state.userTransactionError = null;
      state.userTransactionSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getUserTransactions.pending, (state) => {
        state.isUserTransactionsLoading = true;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isUserTransactionsLoading = false;
        state.userTransactionsError = action.payload;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isUserTransactionsLoading = false;
        state.userTransactionsSuccess = action.payload?.data?.message;
        state.userTransactions = [...state.userTransactions, ...action.payload?.data?.data];
      })
      .addCase(getUserTransaction.pending, (state) => {
        state.isUserTransactionLoading = true;
      })
      .addCase(getUserTransaction.rejected, (state, action) => {
        state.isUserTransactionLoading = false;
        state.userTransactionError = action.payload;
      })
      .addCase(getUserTransaction.fulfilled, (state, action) => {
        state.isUserTransactionLoading = false;
        state.userTransactionSuccess = action.payload?.data?.message;
        state.userTransaction = action.payload?.data?.data;
      });
  },
});

export const { resetUserTransactions, resetUserTransaction, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
