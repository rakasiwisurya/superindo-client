import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAsyncThunkPayload, TAuthState } from "@/types";
import { requestApi, webStorage } from "@/utils";

export const registerAdmin = createAsyncThunk(
  "registerAdmin",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/register-admin`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/login-admin`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/register`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk("login", async (payload: TAsyncThunkPayload, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "post",
      endpoint: `/login`,
      body: payload,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

const initialState: TAuthState = {
  user: null,
  isAppLoading: true,

  isRegisterAdminLoading: false,
  registerAdminError: null,
  registerAdminSuccess: null,

  isLoginAdminLoading: false,
  loginAdminSuccess: null,
  loginAdminError: null,

  isRegisterLoading: false,
  registerError: null,
  registerSuccess: null,

  isLoginLoading: false,
  loginSuccess: null,
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAppLoading = action.payload?.isAppLoading;
      state.user = action.payload?.user;
    },
    logout: (state) => {
      state.user = null;
      state.isAppLoading = false;
      webStorage.clear();
    },
    resetRegisterAdmin: (state) => {
      state.isRegisterAdminLoading = false;
      state.registerAdminError = null;
      state.registerAdminSuccess = null;
    },
    resetLoginAdmin: (state) => {
      state.isLoginAdminLoading = false;
      state.loginAdminError = null;
      state.loginAdminSuccess = null;
    },
    resetRegister: (state) => {
      state.isRegisterLoading = false;
      state.registerError = null;
      state.registerSuccess = null;
    },
    resetLogin: (state) => {
      state.isLoginLoading = false;
      state.loginError = null;
      state.loginSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(registerAdmin.pending, (state) => {
        state.isRegisterAdminLoading = true;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isRegisterAdminLoading = false;
        state.registerAdminError = action.payload;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isRegisterAdminLoading = false;
        state.registerAdminSuccess = action.payload?.data?.message;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoginAdminLoading = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoginAdminLoading = false;
        state.loginAdminError = action.payload;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoginAdminLoading = false;
        state.loginAdminSuccess = action.payload?.data?.message;
        state.user = action.payload?.data?.data;
        webStorage.set("user", action.payload?.data?.data);
      })
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.registerSuccess = action.payload?.data?.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.loginSuccess = action.payload?.data?.message;
        state.user = action.payload?.data?.data;
        webStorage.set("user", action.payload?.data?.data);
      });
  },
});

export const { setUser, logout, resetRegisterAdmin, resetLoginAdmin, resetRegister, resetLogin } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
