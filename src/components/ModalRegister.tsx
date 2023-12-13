import { register, resetRegister, useAppDispatch, useAppSelector } from "@/redux";
import { IModalCommonProps } from "@/types";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";

const ModalRegister = ({ isOpen, onCancel }: IModalCommonProps) => {
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
    dispatch(register(values));
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
      centered
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

export default ModalRegister;
