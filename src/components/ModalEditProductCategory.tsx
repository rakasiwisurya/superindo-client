import {
  getProductCategories,
  getProductCategory,
  resetUpdateProductCategory,
  updateProductCategory,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import Loading from "./Loading";

const ModalEditProductCategory = ({
  isOpen,
  onCancel,
  id,
}: {
  isOpen: boolean;
  onCancel: () => void;
  id: any;
}) => {
  const dispatch = useAppDispatch();
  const {
    productCategory,
    isProductCategoryLoading,
    isUpdateProductCategoryLoading,
    updateProductCategorySuccess,
  } = useAppSelector((state) => state.productCategory);

  useEffect(() => {
    if (id && isOpen) dispatch(getProductCategory({ id }));
  }, [dispatch, id, isOpen]);

  useEffect(() => {
    if (updateProductCategorySuccess) {
      notification.success({ message: "Success", description: updateProductCategorySuccess });
      dispatch(resetUpdateProductCategory());
      dispatch(getProductCategories());
      onCancel();
    }
  }, [dispatch, onCancel, updateProductCategorySuccess]);

  const handleSubmit = (values: any) => {
    dispatch(updateProductCategory({ ...values, id }));
  };

  if (isProductCategoryLoading)
    return (
      <Modal title="Edit Product Category" open={isOpen} onCancel={onCancel} footer={null}>
        <Loading />
      </Modal>
    );

  return (
    <Modal
      title="Edit Product Category"
      open={isOpen}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "formEditProductCategory",
        loading: isUpdateProductCategoryLoading,
      }}
      destroyOnClose
    >
      <Form
        id="formEditProductCategory"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ name: productCategory?.name }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditProductCategory;
