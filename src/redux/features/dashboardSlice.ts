import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TDashboardState } from "@/types";
import { requestApi } from "@/utils";

export const getDashboard = createAsyncThunk("getDashboard", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/dashboard`,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

const initialState: TDashboardState = {
  dashboard: null,
  isDashboardLoading: false,
  dashboardError: null,
  dashboardSuccess: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => {
      state.isDashboardLoading = false;
      state.dashboardError = null;
      state.dashboardSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getDashboard.pending, (state) => {
        state.isDashboardLoading = true;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isDashboardLoading = false;
        state.dashboardError = action.payload;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isDashboardLoading = false;
        state.dashboardSuccess = action.payload?.data?.message;
        state.dashboard = action.payload?.data?.data;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
