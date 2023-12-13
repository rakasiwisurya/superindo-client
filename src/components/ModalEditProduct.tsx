import {
  getProduct,
  getProducts,
  resetUpdateProduct,
  updateProduct,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { IModalEditCommonProps } from "@/types";
import { Form, Input, Modal, Select, notification } from "antd";
import { useEffect } from "react";
import Loading from "./Loading";

const ModalEditProduct = ({ isOpen, onCancel, id }: IModalEditCommonProps) => {
  const dispatch = useAppDispatch();
  const { product, isProductLoading, isUpdateProductLoading, updateProductSuccess } =
    useAppSelector((state) => state.product);
  const { productCategories } = useAppSelector((state) => state.productCategory);

  useEffect(() => {
    if (id && isOpen) dispatch(getProduct({ id }));
  }, [dispatch, id, isOpen]);

  useEffect(() => {
    if (updateProductSuccess) {
      notification.success({ message: "Success", description: updateProductSuccess });
      dispatch(resetUpdateProduct());
      dispatch(getProducts());
      onCancel();
    }
  }, [dispatch, onCancel, updateProductSuccess]);

  const handleSubmit = (values: any) => {
    dispatch(updateProduct({ ...values, id }));
  };

  if (isProductLoading)
    return (
      <Modal title="Edit Product" open={isOpen} onCancel={onCancel} footer={null}>
        <Loading />
      </Modal>
    );

  return (
    <Modal
      title="Edit Product"
      open={isOpen}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "formEditProduct",
        loading: isUpdateProductLoading,
      }}
      destroyOnClose
    >
      <Form
        id="formEditProduct"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          plu: product?.plu,
          name: product?.name,
          product_category_id: product?.product_category_id,
        }}
      >
        <Form.Item label="PLU" name="plu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Product Category" name="product_category_id" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Select a product category"
            optionFilterProp="children"
            filterOption={(input: string, option?: { label: string; value: string }) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={productCategories?.map((productCategory) => ({
              label: productCategory.name,
              value: productCategory.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
