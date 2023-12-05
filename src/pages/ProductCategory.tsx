import { ButtonCustom, ModalAddProductCategory, ModalEditProductCategory } from "@/components";
import {
  clearProductCategory,
  deleteProductCategory,
  getProductCategories,
  resetDeleteProductCategory,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { DeleteOutlined, EditOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { Button, Divider, Flex, Modal, Table, Typography, notification } from "antd";
import { ColumnType } from "antd/es/table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;

const ProductCategory = () => {
  const dispatch = useAppDispatch();
  const { productCategories, deleteProductCategorySuccess } = useAppSelector(
    (state) => state.productCategory
  );

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const columns = useRef<ColumnType<any>[]>([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    dispatch(getProductCategories());

    return () => {
      dispatch(clearProductCategory());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductCategorySuccess) {
      notification.success({ message: "Success", description: deleteProductCategorySuccess });
      dispatch(resetDeleteProductCategory());
      dispatch(getProductCategories());
      Modal.destroyAll();
    }
  }, [dispatch, deleteProductCategorySuccess]);

  const handleEdit = (record: any) => {
    setEditId(record?.id);
    console.log("record?.id", record?.id);
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
      onOk: () => dispatch(deleteProductCategory({ id: record?.id })),
    });
  };

  return (
    <section id="productCategory">
      <Title level={2} style={{ fontSize: "1.1rem" }}>
        Product Category
      </Title>

      <Divider />

      <Button type="primary" onClick={() => setIsModalAddOpen(true)} style={{ marginBottom: 20 }}>
        Add Product Category
      </Button>

      <Table
        dataSource={productCategories}
        columns={columns.current}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
      />

      <ModalAddProductCategory isOpen={isModalAddOpen} onCancel={() => setIsModalAddOpen(false)} />

      <ModalEditProductCategory
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

export default ProductCategory;
