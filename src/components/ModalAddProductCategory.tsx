import {
  addProductCategory,
  getProductCategories,
  resetAddProductCategory,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { IModalCommonProps } from "@/types";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";

const ModalAddProductCategory = ({ isOpen, onCancel }: IModalCommonProps) => {
  const dispatch = useAppDispatch();
  const { isAddProductCategoryLoading, addProductCategorySuccess } = useAppSelector(
    (state) => state.productCategory
  );

  useEffect(() => {
    if (addProductCategorySuccess) {
      notification.success({ message: "Success", description: addProductCategorySuccess });
      dispatch(getProductCategories());
      dispatch(resetAddProductCategory());
      onCancel();
    }
  }, [dispatch, onCancel, addProductCategorySuccess]);

  const handleSubmit = (values: any) => {
    dispatch(addProductCategory(values));
  };

  return (
    <Modal
      title="Add Product Category"
      open={isOpen}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "formAddProductCategory",
        loading: isAddProductCategoryLoading,
      }}
      destroyOnClose
    >
      <Form id="formAddProductCategory" onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProductCategory;
