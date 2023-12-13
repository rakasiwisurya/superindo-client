import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAsyncThunkPayload, TProductVariantState } from "@/types";
import { requestApi } from "@/utils";

export const addProductVariant = createAsyncThunk(
  "addProductVariant",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        contentType: "formData",
        method: "post",
        endpoint: `/product-variants`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getProductVariants = createAsyncThunk("getProductVariants", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/product-variants`,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

export const getProductVariant = createAsyncThunk(
  "getProductVariant",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/product-variants/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateProductVariant = createAsyncThunk(
  "updateProductVariant",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    const id = payload?.id;
    if (payload?.id) delete payload?.id;

    try {
      const response = await requestApi({
        contentType: "formData",
        method: "put",
        endpoint: `/product-variants/${id}`,
        body: payload?.formData,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const deleteProductVariant = createAsyncThunk(
  "deleteProductVariant",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "delete",
        endpoint: `/product-variants/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState: TProductVariantState = {
  productVariants: [],
  isProductVariantsLoading: true,
  productVariantsError: null,
  productVariantsSuccess: null,

  productVariant: null,
  isProductVariantLoading: true,
  productVariantError: null,
  productVariantSuccess: null,

  isAddProductVariantLoading: false,
  addProductVariantError: null,
  addProductVariantSuccess: null,

  isUpdateProductVariantLoading: false,
  updateProductVariantError: null,
  updateProductVariantSuccess: null,

  isDeleteProductVariantLoading: false,
  deleteProductVariantError: null,
  deleteProductVariantSuccess: null,
};

const productVariantSlice = createSlice({
  name: "productVariant",
  initialState,
  reducers: {
    setProductVariants: (state, action) => {
      state.productVariants = action.payload;
    },
    resetProductVariants: (state) => {
      state.isProductVariantsLoading = true;
      state.productVariantsError = null;
      state.productVariantsSuccess = null;
    },
    resetProductVariant: (state) => {
      state.isProductVariantLoading = true;
      state.productVariantError = null;
      state.productVariantSuccess = null;
    },
    resetAddProductVariant: (state) => {
      state.isAddProductVariantLoading = false;
      state.addProductVariantError = null;
      state.addProductVariantSuccess = null;
    },
    resetUpdateProductVariant: (state) => {
      state.isUpdateProductVariantLoading = false;
      state.updateProductVariantError = null;
      state.updateProductVariantSuccess = null;
    },
    resetDeleteProductVariant: (state) => {
      state.isDeleteProductVariantLoading = false;
      state.deleteProductVariantError = null;
      state.deleteProductVariantSuccess = null;
    },
    clearProductVariant: (state) => {
      state.productVariants = [];
      state.isProductVariantsLoading = true;
      state.productVariantsError = null;
      state.productVariantsSuccess = null;

      state.productVariant = null;
      state.isProductVariantLoading = true;
      state.productVariantError = null;
      state.productVariantSuccess = null;

      state.isAddProductVariantLoading = false;
      state.addProductVariantError = null;
      state.addProductVariantSuccess = null;

      state.isUpdateProductVariantLoading = false;
      state.updateProductVariantError = null;
      state.updateProductVariantSuccess = null;

      state.isDeleteProductVariantLoading = false;
      state.deleteProductVariantError = null;
      state.deleteProductVariantSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(addProductVariant.pending, (state) => {
        state.isAddProductVariantLoading = true;
      })
      .addCase(addProductVariant.rejected, (state, action) => {
        state.isAddProductVariantLoading = false;
        state.addProductVariantError = action.payload;
      })
      .addCase(addProductVariant.fulfilled, (state, action) => {
        state.isAddProductVariantLoading = false;
        state.addProductVariantSuccess = action.payload?.data?.message;
      })
      .addCase(getProductVariants.pending, (state) => {
        state.isProductVariantsLoading = true;
      })
      .addCase(getProductVariants.rejected, (state, action) => {
        state.isProductVariantsLoading = false;
        state.productVariantsError = action.payload;
      })
      .addCase(getProductVariants.fulfilled, (state, action) => {
        state.isProductVariantsLoading = false;
        state.productVariantsSuccess = action.payload?.data?.message;
        state.productVariants = action.payload?.data?.data?.map((product: any) => ({
          ...product,
          value: 0,
        }));
      })
      .addCase(getProductVariant.pending, (state) => {
        state.isProductVariantLoading = true;
      })
      .addCase(getProductVariant.rejected, (state, action) => {
        state.isProductVariantLoading = false;
        state.productVariantError = action.payload;
      })
      .addCase(getProductVariant.fulfilled, (state, action) => {
        state.isProductVariantLoading = false;
        state.productVariantSuccess = action.payload?.data?.message;
        state.productVariant = action.payload?.data?.data;
      })
      .addCase(updateProductVariant.pending, (state) => {
        state.isUpdateProductVariantLoading = true;
      })
      .addCase(updateProductVariant.rejected, (state, action) => {
        state.isUpdateProductVariantLoading = false;
        state.updateProductVariantError = action.payload;
      })
      .addCase(updateProductVariant.fulfilled, (state, action) => {
        state.isUpdateProductVariantLoading = false;
        state.updateProductVariantSuccess = action.payload?.data?.message;
      })
      .addCase(deleteProductVariant.pending, (state) => {
        state.isDeleteProductVariantLoading = true;
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.isDeleteProductVariantLoading = false;
        state.deleteProductVariantError = action.payload;
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.isDeleteProductVariantLoading = false;
        state.deleteProductVariantSuccess = action.payload?.data?.message;
      });
  },
});

export const {
  setProductVariants,
  resetProductVariants,
  resetProductVariant,
  resetAddProductVariant,
  resetUpdateProductVariant,
  resetDeleteProductVariant,
  clearProductVariant,
} = productVariantSlice.actions;
export const productVariantReducer = productVariantSlice.reducer;
