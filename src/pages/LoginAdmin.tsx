import { ModalRegisterAdmin } from "@/components";
import { loginAdmin, resetLoginAdmin, useAppDispatch, useAppSelector } from "@/redux";
import { Button, Card, Flex, Form, Input, Typography, notification } from "antd";
import { useEffect, useState } from "react";

const LoginAdmin = () => {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoginAdminLoading, loginAdminSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (loginAdminSuccess) {
      notification.success({ message: "Success", description: loginAdminSuccess });
      dispatch(resetLoginAdmin());
    }
  }, [dispatch, loginAdminSuccess]);

  const handleLogin = (values: any) => {
    dispatch(loginAdmin(values));
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ width: "100%", height: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <Card bordered={false} style={{ width: 300 }}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 20, marginTop: 0, color: "#868687" }}
          >
            SUPERINDO
          </Typography.Title>

          <Form onFinish={handleLogin} layout="vertical" requiredMark={false}>
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

            <div style={{ margin: "20px 0" }}>
              Don't have any account?{" "}
              <span
                style={{ color: "#1677ff", cursor: "pointer" }}
                onClick={() => setIsModalRegisterOpen(true)}
              >
                register
              </span>
            </div>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" loading={isLoginAdminLoading} block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>

      <ModalRegisterAdmin
        isOpen={isModalRegisterOpen}
        onCancel={() => setIsModalRegisterOpen(false)}
      />
    </>
  );
};

export default LoginAdmin;
