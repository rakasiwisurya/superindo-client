export type TRequestApi = {
  contentType?: "json" | "formData";
  method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
  endpoint: string;
  body?: any;
  params?: any;
};
