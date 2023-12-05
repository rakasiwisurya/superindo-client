import { registerAdmin, resetRegister, useAppDispatch, useAppSelector } from "@/redux";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";

const ModalRegisterAdmin = ({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) => {
  const dispatch = useAppDispatch();
  const { isRegisterAdminLoading, registerAdminSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (registerAdminSuccess) {
      notification.success({ message: "Success", description: registerAdminSuccess });
      dispatch(resetRegister());
      onCancel();
    }
  }, [dispatch, onCancel, registerAdminSuccess]);

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
