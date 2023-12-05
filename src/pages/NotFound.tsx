import { Empty, Flex } from "antd";

const NotFound = () => {
  return (
    <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
      <Empty
        description={
          <span style={{ fontWeight: "700", color: "#AEB8C2" }}>404 | Page Not Found</span>
        }
      />
    </Flex>
  );
};

export default NotFound;
