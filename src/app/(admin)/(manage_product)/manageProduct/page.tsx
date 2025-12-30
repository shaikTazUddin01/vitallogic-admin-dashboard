"use client";

import { useState } from "react";
import { Table, Button, Modal, Switch, Popconfirm, message } from "antd";

import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import TDTextArea from "@/src/components/form/TDTextArea";
import TDSelect from "@/src/components/form/TDSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidation } from "@/src/validation/productValidation";
import { SubmitHandler, FieldValues } from "react-hook-form";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/src/redux/features/product/productApi";

const ManageProductsPage = () => {
  const { data, isLoading, refetch } = useGetProductsQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data || [];
  console.log(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleUpdateClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateProduct({ id: selectedProduct._id, ...data }).unwrap();
      message.success("Product updated successfully");
      setIsModalOpen(false);
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted successfully");
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Delete failed");
    }
  };

  const handleStatusChange = async (checked: boolean, product: any) => {
    try {
      await updateProduct({
        id: product._id,
        status: checked ? "active" : "inactive",
      }).unwrap();
      message.success("Status updated");
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Status update failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val: number) => `$${val}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Switch
          checked={status === "active"}
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
     {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (val: string) => `$${val.slice(0,50)}...`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => handleUpdateClick(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />

      <Modal
        title="Update Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedProduct && (
          <TDForm
            resolver={zodResolver(productValidation)}
            onSubmit={handleUpdate}
            defaultValues={selectedProduct}
          >
            <TDInput label="Name" name="name" required />
            <TDInput label="Image URL" name="image" required />
            <TDInput label="Price" name="price" type="number" required />
            <TDSelect
              label="Status"
              name="status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              required
            />
            <TDTextArea
              label="Description"
              name="description"
              required
              placeholdertext="Product description"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-[#390dff] text-white p-2 rounded-2xl"
            >
              Update Product
            </button>
          </TDForm>
        )}
      </Modal>
    </div>
  );
};

export default ManageProductsPage;
