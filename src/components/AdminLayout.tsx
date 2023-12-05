import { useEffect, useRef, useState } from "react";
import {
  BarChartOutlined,
  DashboardOutlined,
  CloudServerOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Typography, Flex, Dropdown, Avatar } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logout, useAppDispatch } from "@/redux";

const { Footer, Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const { pathname } = useLocation();

  const [current, setCurrent] = useState(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current !== pathname) setCurrent(pathname);
  }, [current, pathname]);

  const menus = useRef([
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "/admin/product-category",
      icon: <CloudUploadOutlined />,
      label: <Link to="/admin/product-category">Product Category</Link>,
    },
    {
      key: "/admin/product",
      icon: <CloudSyncOutlined />,
      label: <Link to="/admin/product">Product</Link>,
    },
    {
      key: "/admin/product-variant",
      icon: <CloudServerOutlined />,
      label: <Link to="/admin/product-variant">Product Variant</Link>,
    },
    {
      key: "/admin/transaction",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/transaction">Transaction</Link>,
    },
  ]);
  const items = useRef([
    {
      key: "1",
      icon: <LogoutOutlined />,
      label: <div onClick={() => dispatch(logout())}>Logout</div>,
    },
  ]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ height: "100vh" }}
      >
        <Flex align="center" justify="center" style={{ height: 64 }}>
          <Title level={1} style={{ color: "#868687", fontSize: collapsed ? ".7rem" : "1rem" }}>
            SUPERINDO
          </Title>
        </Flex>

        <Menu
          theme="light"
          mode="inline"
          onSelect={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          items={menus.current}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Flex align="center" justify="center" style={{ width: 64, height: 64 }}>
            <Dropdown
              menu={{ items: items.current }}
              trigger={["click"]}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Avatar size={30} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
            </Dropdown>
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Superindo ©2023 Created by Rakasiwi Surya</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
