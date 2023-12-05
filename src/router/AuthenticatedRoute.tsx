import { setUser, useAppDispatch, useAppSelector } from "@/redux";
import { webStorage } from "@/utils";
import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAppLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setUser({ user: webStorage.get("user"), isAppLoading: false }));
  }, [dispatch]);

  useEffect(() => {
    if (!isAppLoading) {
      if (pathname === "/admin") navigate("/admin/login", { replace: true });
      if (!user && pathname !== "/login" && pathname !== "/") {
        navigate("/admin/login", { replace: true });
      }
      if (user && user?.role === "ADMINISTRATOR" && pathname === "/admin/login") {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [pathname, navigate, user, isAppLoading]);

  if (isAppLoading)
    return (
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Spin size="large" />;
      </Flex>
    );

  return <Outlet />;
};

export default AuthenticatedRoute;
