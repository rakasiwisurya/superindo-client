import { MainContent, Navbar, SideContent } from "@/components";
import { Flex, Layout } from "antd";

const Home = () => {
  return (
    <Layout>
      <Navbar />

      <Layout>
        <Flex>
          <SideContent />
          <MainContent />
        </Flex>
      </Layout>
    </Layout>
  );
};

export default Home;
