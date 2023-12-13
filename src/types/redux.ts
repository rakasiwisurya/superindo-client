export type TAsyncThunkPayload = any | undefined;

export type TAuthState = {
  user: any;
  isAppLoading: boolean;

  isRegisterAdminLoading: boolean;
  registerAdminError: any;
  registerAdminSuccess: any;

  isLoginAdminLoading: boolean;
  loginAdminSuccess: any;
  loginAdminError: any;

  isRegisterLoading: boolean;
  registerError: any;
  registerSuccess: any;

  isLoginLoading: boolean;
  loginSuccess: any;
  loginError: any;
};

export type TDashboardState = {
  dashboard: any;
  isDashboardLoading: boolean;
  dashboardError: any;
  dashboardSuccess: any;
};

export type TProductCategoryState = {
  productCategories: any[];
  isProductCategoriesLoading: boolean;
  productCategoriesError: any;
  productCategoriesSuccess: any;

  productCategory: any;
  isProductCategoryLoading: boolean;
  productCategoryError: any;
  productCategorySuccess: any;

  isAddProductCategoryLoading: boolean;
  addProductCategoryError: any;
  addProductCategorySuccess: any;

  isUpdateProductCategoryLoading: boolean;
  updateProductCategoryError: any;
  updateProductCategorySuccess: any;

  isDeleteProductCategoryLoading: boolean;
  deleteProductCategoryError: any;
  deleteProductCategorySuccess: any;
};

export type TProductState = {
  products: any[];
  isProductsLoading: boolean;
  productsError: any;
  productsSuccess: any;

  product: any;
  isProductLoading: boolean;
  productError: any;
  productSuccess: any;

  isAddProductLoading: boolean;
  addProductError: any;
  addProductSuccess: any;

  isUpdateProductLoading: boolean;
  updateProductError: any;
  updateProductSuccess: any;

  isDeleteProductLoading: boolean;
  deleteProductError: any;
  deleteProductSuccess: any;
};

export type TProductVariantState = {
  productVariants: any[];
  isProductVariantsLoading: boolean;
  productVariantsError: any;
  productVariantsSuccess: any;

  productVariant: any;
  isProductVariantLoading: boolean;
  productVariantError: any;
  productVariantSuccess: any;

  isAddProductVariantLoading: boolean;
  addProductVariantError: any;
  addProductVariantSuccess: any;

  isUpdateProductVariantLoading: boolean;
  updateProductVariantError: any;
  updateProductVariantSuccess: any;

  isDeleteProductVariantLoading: boolean;
  deleteProductVariantError: any;
  deleteProductVariantSuccess: any;
};

export type TTransactionState = {
  isAddTransactionLoading: boolean;
  addTransactionError: any;
  addTransactionSuccess: any;

  transactions: any[];
  isTransactionsLoading: boolean;
  transactionsError: any;
  transactionsSuccess: any;

  transactionDetails: any[];
  isTransactionDetailsLoading: boolean;
  transactionDetailsError: any;
  transactionDetailsSuccess: any;
};

export type TCartState = {
  carts: {
    id: any;
    product_variant_name: string;
    price: number;
    qty: number;
    subTotal: number;
  }[];
};

export type TUserState = {
  userTransactions: any[];
  isUserTransactionsLoading: boolean;
  userTransactionsError: any;
  userTransactionsSuccess: any;

  userTransaction: any;
  isUserTransactionLoading: boolean;
  userTransactionError: any;
  userTransactionSuccess: any;
};
