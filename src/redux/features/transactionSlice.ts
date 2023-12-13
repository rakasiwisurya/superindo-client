import { TAsyncThunkPayload, TTransactionState } from "@/types";
import { requestApi } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addTransaction = createAsyncThunk(
  "addTransaction",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/transactions`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getTransactions = createAsyncThunk("getTransactions", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/transactions`,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

export const getTransactionDetails = createAsyncThunk(
  "getTransactionDetails",
  async (_, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/transaction-details`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState: TTransactionState = {
  transactions: [],
  isTransactionsLoading: true,
  transactionsError: null,
  transactionsSuccess: null,

  transactionDetails: [],
  isTransactionDetailsLoading: true,
  transactionDetailsError: null,
  transactionDetailsSuccess: null,

  isAddTransactionLoading: true,
  addTransactionError: null,
  addTransactionSuccess: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.isTransactionsLoading = true;
      state.transactionsError = null;
      state.transactionsSuccess = null;
    },
    resetTransactionDetails: (state) => {
      state.isTransactionDetailsLoading = true;
      state.transactionDetailsError = null;
      state.transactionDetailsSuccess = null;
    },
    clearTransaction: (state) => {
      state.transactions = [];
      state.isTransactionsLoading = true;
      state.transactionsError = null;
      state.transactionsSuccess = null;

      state.transactionDetails = [];
      state.isTransactionDetailsLoading = true;
      state.transactionDetailsError = null;
      state.transactionDetailsSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder

      .addCase(addTransaction.pending, (state) => {
        state.isAddTransactionLoading = true;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isAddTransactionLoading = false;
        state.addTransactionError = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isAddTransactionLoading = false;
        state.addTransactionSuccess = action.payload?.data?.message;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isTransactionsLoading = true;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isTransactionsLoading = false;
        state.transactionsError = action.payload;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isTransactionsLoading = false;
        state.transactionsSuccess = action.payload?.data?.message;
        state.transactions = action.payload?.data?.data;
      })
      .addCase(getTransactionDetails.pending, (state) => {
        state.isTransactionDetailsLoading = true;
      })
      .addCase(getTransactionDetails.rejected, (state, action) => {
        state.isTransactionDetailsLoading = false;
        state.transactionDetailsError = action.payload;
      })
      .addCase(getTransactionDetails.fulfilled, (state, action) => {
        state.isTransactionDetailsLoading = false;
        state.transactionDetailsSuccess = action.payload?.data?.message;
        state.transactionDetails = action.payload?.data?.data;
      });
  },
});

export const { resetTransactions, resetTransactionDetails, clearTransaction } =
  transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
