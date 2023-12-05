import { TRequestApi } from "@/types";
import { notification } from "antd";
import { api } from "./api";

const queryParams = (data: any) => {
  return `?${Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&")}`;
};

export const requestApi = async ({
  contentType = "json", //json or formData
  method, //get or post or put or delete or others http method
  endpoint,
  body,
  params,
}: TRequestApi) => {
  try {
    const newParams = params ? queryParams(params) : "";
    const response = await api(contentType)[method](`${endpoint}${newParams}`, body);
    return response;
  } catch (error: any) {
    console.error(error);
    notification.error({
      message: "Failed",
      description: error?.response?.data?.message || error.message,
    });
    throw new Error(error);
  }
};
