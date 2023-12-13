import { registerAdmin, resetRegisterAdmin, useAppDispatch, useAppSelector } from "@/redux";
import { IModalCommonProps } from "@/types";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";

const ModalRegisterAdmin = ({ isOpen, onCancel }: IModalCommonProps) => {
  const dispatch = useAppDispatch();
  const { isRegisterAdminLoading, registerAdminSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (registerAdminSuccess) {
      notification.success({ message: "Success", description: registerAdminSuccess });
      dispatch(resetRegisterAdmin());
      onCancel();
    }
  }, [dispatch, onCancel, registerAdminSuccess]);

  useEffect(() => {
    if (!isOpen) dispatch(resetRegisterAdmin());
  }, [dispatch, isOpen]);

  const handleRegister = (values: any) => {
    dispatch(registerAdmin(values));
  };

  return (
    <Modal
      title="Register"
      open={isOpen}
      onCancel={onCancel}
      width={350}
      okText="Register"
      okButtonProps={{
        htmlType: "submit",
        form: "formRegister",
        loading: isRegisterAdminLoading,
      }}
      destroyOnClose
    >
      <Form id="formRegister" onFinish={handleRegister} layout="vertical" requiredMark={false}>
        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRegisterAdmin;
