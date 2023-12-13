import { ButtonCustom, ModalAddProduct, ModalEditProduct } from "@/components";
import {
  clearProduct,
  clearProductCategory,
  deleteProduct,
  getProductCategories,
  getProducts,
  resetDeleteProduct,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { DeleteOutlined, EditOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { Button, Divider, Flex, Modal, Table, Typography, notification } from "antd";
import { ColumnType } from "antd/es/table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;

const Product = () => {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products, deleteProductSuccess } = useAppSelector(
    (state) => state.product
  );

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const columns = useRef<ColumnType<any>[]>([
    {
      title: "PLU",
      dataIndex: "plu",
      key: "plu",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Flex gap={10}>
          <ButtonCustom
            variant="outline-warning"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Flex>
      ),
    },
  ]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductCategories());

    return () => {
      dispatch(clearProduct());
      dispatch(clearProductCategory());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductSuccess) {
      notification.success({ message: "Success", description: deleteProductSuccess });
      dispatch(resetDeleteProduct());
      dispatch(getProducts());
      Modal.destroyAll();
    }
  }, [dispatch, deleteProductSuccess]);

  const handleEdit = (record: any) => {
    setEditId(record?.id);
    setIsModalEditOpen(true);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      icon: <QuestionCircleFilled />,
      title: "Confirmation",
      content: `Are you sure want to delete ${record?.name} ?`,
      okText: "Hapus",
      centered: true,
      okButtonProps: { danger: true },
      onOk: () => dispatch(deleteProduct({ id: record?.id })),
    });
  };

  return (
    <section id="product">
      <Title level={2} style={{ fontSize: "1.1rem" }}>
        Product
      </Title>

      <Divider />

      <Button type="primary" onClick={() => setIsModalAddOpen(true)} style={{ marginBottom: 20 }}>
        Add Product
      </Button>

      <Table
        loading={isProductsLoading}
        dataSource={products}
        columns={columns.current}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
      />

      <ModalAddProduct isOpen={isModalAddOpen} onCancel={() => setIsModalAddOpen(false)} />

      <ModalEditProduct
        id={editId}
        isOpen={isModalEditOpen}
        onCancel={() => {
          setIsModalEditOpen(false);
          setEditId(null);
        }}
      />
    </section>
  );
};

export default Product;
