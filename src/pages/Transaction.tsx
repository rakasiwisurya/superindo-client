import { getTransactionDetails, getTransactions, useAppDispatch, useAppSelector } from "@/redux";
import { formatNumber } from "@/utils";
import { Card, Col, Image, Row, Table } from "antd";
import { ColumnType } from "antd/es/table";
import moment from "moment";
import { useEffect, useRef } from "react";

const Transaction = () => {
  const dispatch = useAppDispatch();
  const { isTransactionsLoading, transactions, isTransactionDetailsLoading, transactionDetails } =
    useAppSelector((state) => state.transaction);
  const transactionColumns = useRef<ColumnType<any>[]>([
    {
      title: "Transaction Number",
      dataIndex: "transaction_no",
      key: "transaction_no",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      render: (text: any) => (text ? `Rp. ${formatNumber(text)}` : "-"),
    },
    {
      title: "Created User",
      dataIndex: "created_user",
      key: "created_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
    {
      title: "Updated User",
      dataIndex: "updated_user",
      key: "updated_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      key: "updated_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
  ]);
  const transactionDetailColumns = useRef<ColumnType<any>[]>([
    {
      title: "Image",
      dataIndex: "product_variant_image_location",
      key: "product_variant_image_location",
      align: "center",
      render: (text: any) => (text ? <Image width={100} src={text} /> : "-"),
    },
    {
      title: "Transaction Number",
      dataIndex: "transaction_no",
      key: "transaction_no",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text: any) => (text ? `Rp. ${formatNumber(text)}` : "-"),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (text: any) => (text ? formatNumber(text) : "-"),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
      render: (text: any) => (text ? `Rp. ${formatNumber(text)}` : "-"),
    },
    {
      title: "Product Variant Code",
      dataIndex: "product_variant_code",
      key: "product_variant_code",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Product Variant Name",
      dataIndex: "product_variant_name",
      key: "product_variant_name",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "PLU",
      dataIndex: "product_plu",
      key: "product_plu",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Product Category",
      dataIndex: "product_category_name",
      key: "product_category_name",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Created User",
      dataIndex: "created_user",
      key: "created_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
    {
      title: "Updated User",
      dataIndex: "updated_user",
      key: "updated_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      key: "updated_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
  ]);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getTransactionDetails());
  }, [dispatch]);

  return (
    <section id="transaction">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Transaction">
            <Table
              loading={isTransactionsLoading}
              dataSource={transactions}
              columns={transactionColumns.current}
              scroll={{ x: "max-content" }}
              rowKey="id"
              bordered
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Transaction Detail">
            <Table
              loading={isTransactionDetailsLoading}
              dataSource={transactionDetails}
              columns={transactionDetailColumns.current}
              scroll={{ x: "max-content" }}
              rowKey="id"
              bordered
            />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Transaction;
