import { getDashboard, resetDashboard, useAppDispatch, useAppSelector } from "@/redux";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { dashboard, isDashboardLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard) dispatch(resetDashboard());
  }, [dispatch, dashboard]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Product Category"
            value={dashboard?.total_product_category}
            suffix="unit(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Product"
            value={dashboard?.total_product}
            suffix="unit(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Product Variant"
            value={dashboard?.total_product_variant}
            suffix="unit(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Transaction"
            value={dashboard?.total_transaction}
            suffix="transaction(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Customer"
            value={dashboard?.total_customer_user}
            suffix="person(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card className="card-shadow">
          <Statistic
            title="Total Administrator"
            value={dashboard?.total_adminstrator_user}
            suffix="person(s)"
            loading={isDashboardLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
