import { login, resetLogin, useAppDispatch, useAppSelector } from "@/redux";
import { IModalCommonProps } from "@/types";
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";

const ModalLogin = ({ isOpen, onCancel }: IModalCommonProps) => {
  const dispatch = useAppDispatch();
  const { isLoginLoading, loginSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (loginSuccess) {
      notification.success({ message: "Success", description: loginSuccess });
      dispatch(resetLogin());
      onCancel();
    }
  }, [dispatch, onCancel, loginSuccess]);

  useEffect(() => {
    if (!isOpen) dispatch(resetLogin());
  }, [dispatch, isOpen]);

  const handleLogin = (values: any) => {
    dispatch(login(values));
  };

  return (
    <Modal
      title="Login"
      open={isOpen}
      onCancel={onCancel}
      width={350}
      okText="Login"
      okButtonProps={{
        htmlType: "submit",
        form: "formLogin",
        loading: isLoginLoading,
      }}
      destroyOnClose
      centered
    >
      <Form id="formLogin" onFinish={handleLogin} layout="vertical" requiredMark={false}>
        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
          style={{ marginBottom: 0 }}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogin;
