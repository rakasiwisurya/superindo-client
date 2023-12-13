import { addProduct, getProducts, resetAddProduct, useAppDispatch, useAppSelector } from "@/redux";
import { IModalCommonProps } from "@/types";
import { Form, Input, Modal, Select, notification } from "antd";
import { useEffect } from "react";

const ModalAddProduct = ({ isOpen, onCancel }: IModalCommonProps) => {
  const dispatch = useAppDispatch();
  const { isAddProductLoading, addProductSuccess } = useAppSelector((state) => state.product);
  const { productCategories } = useAppSelector((state) => state.productCategory);

  useEffect(() => {
    if (addProductSuccess) {
      notification.success({ message: "Success", description: addProductSuccess });
      dispatch(getProducts());
      dispatch(resetAddProduct());
      onCancel();
    }
  }, [dispatch, onCancel, addProductSuccess]);

  const handleSubmit = (values: any) => {
    dispatch(addProduct(values));
  };

  return (
    <Modal
      title="Add Product"
      open={isOpen}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "formAddProduct",
        loading: isAddProductLoading,
      }}
      destroyOnClose
    >
      <Form id="formAddProduct" onFinish={handleSubmit} layout="vertical">
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

export default ModalAddProduct;
