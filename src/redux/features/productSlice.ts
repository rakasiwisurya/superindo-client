import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAsyncThunkPayload, TProductState } from "@/types";
import { requestApi } from "@/utils";

export const addProduct = createAsyncThunk(
  "addProduct",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/products`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getProducts = createAsyncThunk("getProducts", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/products`,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

export const getProduct = createAsyncThunk(
  "getProduct",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/products/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    const id = payload?.id;
    if (payload?.id) delete payload?.id;

    try {
      const response = await requestApi({
        method: "put",
        endpoint: `/products/${id}`,
        body: payload,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "delete",
        endpoint: `/products/${payload?.id}`,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState: TProductState = {
  products: [],
  isProductsLoading: true,
  productsError: null,
  productsSuccess: null,

  product: null,
  isProductLoading: true,
  productError: null,
  productSuccess: null,

  isAddProductLoading: false,
  addProductError: null,
  addProductSuccess: null,

  isUpdateProductLoading: false,
  updateProductError: null,
  updateProductSuccess: null,

  isDeleteProductLoading: false,
  deleteProductError: null,
  deleteProductSuccess: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.isProductsLoading = true;
      state.productsError = null;
      state.productsSuccess = null;
    },
    resetProduct: (state) => {
      state.isProductLoading = true;
      state.productError = null;
      state.productSuccess = null;
    },
    resetAddProduct: (state) => {
      state.isAddProductLoading = false;
      state.addProductError = null;
      state.addProductSuccess = null;
    },
    resetUpdateProduct: (state) => {
      state.isUpdateProductLoading = false;
      state.updateProductError = null;
      state.updateProductSuccess = null;
    },
    resetDeleteProduct: (state) => {
      state.isDeleteProductLoading = false;
      state.deleteProductError = null;
      state.deleteProductSuccess = null;
    },
    clearProduct: (state) => {
      state.products = [];
      state.isProductsLoading = true;
      state.productsError = null;
      state.productsSuccess = null;

      state.product = null;
      state.isProductLoading = true;
      state.productError = null;
      state.productSuccess = null;

      state.isAddProductLoading = false;
      state.addProductError = null;
      state.addProductSuccess = null;

      state.isUpdateProductLoading = false;
      state.updateProductError = null;
      state.updateProductSuccess = null;

      state.isDeleteProductLoading = false;
      state.deleteProductError = null;
      state.deleteProductSuccess = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(addProduct.pending, (state) => {
        state.isAddProductLoading = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isAddProductLoading = false;
        state.addProductError = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isAddProductLoading = false;
        state.addProductSuccess = action.payload?.data?.message;
      })
      .addCase(getProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.productsSuccess = action.payload?.data?.message;
        state.products = action.payload?.data?.data;
      })
      .addCase(getProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.productSuccess = action.payload?.data?.message;
        state.product = action.payload?.data?.data;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isUpdateProductLoading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdateProductLoading = false;
        state.updateProductError = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdateProductLoading = false;
        state.updateProductSuccess = action.payload?.data?.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleteProductLoading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleteProductLoading = false;
        state.deleteProductError = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleteProductLoading = false;
        state.deleteProductSuccess = action.payload?.data?.message;
      });
  },
});

export const {
  resetProducts,
  resetProduct,
  resetAddProduct,
  resetUpdateProduct,
  resetDeleteProduct,
  clearProduct,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
