import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      gap={10}
      justify="center"
      align="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div>Home</div>
      <Button onClick={() => navigate("/admin/login")}>Login</Button>
    </Flex>
  );
};

export default Home;
