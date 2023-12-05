import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAsyncThunkPayload, TProductCategoryState } from "@/types";
import { requestApi } from "@/utils";

export const addProductCategory = createAsyncThunk(
  "addProductCategory",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/product-categories`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getProductCategories = createAsyncThunk(
  "getProductCategories",
  async (_, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/product-categories`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getProductCategory = createAsyncThunk(
  "getProductCategory",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/product-categories/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "updateProductCategory",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    const id = payload?.id;
    if (payload?.id) delete payload?.id;

    try {
      const response = await requestApi({
        method: "put",
        endpoint: `/product-categories/${id}`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "deleteProductCategory",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "delete",
        endpoint: `/product-categories/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState: TProductCategoryState = {
  productCategories: [],
  isProductCategoriesLoading: true,
  productCategoriesError: null,
  productCategoriesSuccess: null,

  productCategory: null,
  isProductCategoryLoading: true,
  productCategoryError: null,
  productCategorySuccess: null,

  isAddProductCategoryLoading: false,
  addProductCategoryError: null,
  addProductCategorySuccess: null,

  isUpdateProductCategoryLoading: false,
  updateProductCategoryError: null,
  updateProductCategorySuccess: null,

  isDeleteProductCategoryLoading: false,
  deleteProductCategoryError: null,
  deleteProductCategorySuccess: null,
};

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    resetProductCategories: (state) => {
      state.isProductCategoriesLoading = true;
      state.productCategoriesError = null;
      state.productCategoriesSuccess = null;
    },
    resetProductCategory: (state) => {
      state.isProductCategoryLoading = true;
      state.productCategoryError = null;
      state.productCategorySuccess = null;
    },
    resetAddProductCategory: (state) => {
      state.isAddProductCategoryLoading = false;
      state.addProductCategoryError = null;
      state.addProductCategorySuccess = null;
    },
    resetUpdateProductCategory: (state) => {
      state.isUpdateProductCategoryLoading = false;
      state.updateProductCategoryError = null;
      state.updateProductCategorySuccess = null;
    },
    resetDeleteProductCategory: (state) => {
      state.isDeleteProductCategoryLoading = false;
      state.deleteProductCategoryError = null;
      state.deleteProductCategorySuccess = null;
    },
    clearProductCategory: (state) => {
      state.productCategories = [];
      state.isProductCategoriesLoading = true;
      state.productCategoriesError = null;
      state.productCategoriesSuccess = null;

      state.productCategory = null;
      state.isProductCategoryLoading = true;
      state.productCategoryError = null;
      state.productCategorySuccess = null;

      state.isAddProductCategoryLoading = false;
      state.addProductCategoryError = null;
      state.addProductCategorySuccess = null;

      state.isUpdateProductCategoryLoading = false;
      state.updateProductCategoryError = null;
      state.updateProductCategorySuccess = null;

      state.isDeleteProductCategoryLoading = false;
      state.deleteProductCategoryError = null;
      state.deleteProductCategorySuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(addProductCategory.pending, (state) => {
        state.isAddProductCategoryLoading = true;
      })
      .addCase(addProductCategory.rejected, (state, action) => {
        state.isAddProductCategoryLoading = false;
        state.addProductCategoryError = action.payload;
      })
      .addCase(addProductCategory.fulfilled, (state, action) => {
        state.isAddProductCategoryLoading = false;
        state.addProductCategorySuccess = action.payload?.data?.message;
      })
      .addCase(getProductCategories.pending, (state) => {
        state.isProductCategoriesLoading = true;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isProductCategoriesLoading = false;
        state.productCategoriesError = action.payload;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isProductCategoriesLoading = false;
        state.productCategoriesSuccess = action.payload?.data?.message;
        state.productCategories = action.payload?.data?.data;
      })
      .addCase(getProductCategory.pending, (state) => {
        state.isProductCategoryLoading = true;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isProductCategoryLoading = false;
        state.productCategoryError = action.payload;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isProductCategoryLoading = false;
        state.productCategorySuccess = action.payload?.data?.message;
        state.productCategory = action.payload?.data?.data;
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isUpdateProductCategoryLoading = true;
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isUpdateProductCategoryLoading = false;
        state.updateProductCategoryError = action.payload;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isUpdateProductCategoryLoading = false;
        state.updateProductCategorySuccess = action.payload?.data?.message;
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isDeleteProductCategoryLoading = true;
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isDeleteProductCategoryLoading = false;
        state.deleteProductCategoryError = action.payload;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isDeleteProductCategoryLoading = false;
        state.deleteProductCategorySuccess = action.payload?.data?.message;
      });
  },
});

export const {
  resetProductCategories,
  resetProductCategory,
  resetAddProductCategory,
  resetUpdateProductCategory,
  resetDeleteProductCategory,
  clearProductCategory,
} = productCategorySlice.actions;
export const productCategoryReducer = productCategorySlice.reducer;
