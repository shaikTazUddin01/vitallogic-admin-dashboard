/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";

import { TResponse } from "@/src/types";
import TDTextArea from "@/src/components/form/TDTextArea";
import { useAddProductMutation } from "@/src/redux/features/product/productApi";
import { productValidation } from "@/src/validation/productValidation";

const Page = () => {
  const [addProduct] = useAddProductMutation();
  const router = useRouter();

  const handleAddProduct: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log("products-->", data);
      const res = (await addProduct(data)) as TResponse<any>;

      if (!res?.data) {
        toast.error(res?.error?.data?.message);
        return;
      }

      toast.success("Product added successfully");
      router.push("/manageProduct");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full lg:p-20 bg-cover flex items-center justify-center text-black">
      <div className="bg-white rounded-2xl shadow max-w-5xl w-full">
        {/* Form Section */}
        <div className="p-8 lg:p-12 w-full lg:w-[80%] mx-auto">
          <div className="mb-6 text-center space-y-1">
            <h1 className="text-sky-600 text-3xl lg:text-4xl font-bold">
              Add New Product
            </h1>
            <p className="text-gray-500">Fill product information carefully</p>
          </div>

          <TDForm
            resolver={zodResolver(productValidation)}
            onSubmit={handleAddProduct}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <TDInput label="Product Name" name="name" type="text" required />

              <TDInput label="Image URL" name="image" type="text" required />

              <TDInput label="Price" name="price" type="number" required />

           
            </div>

            <div className="mt-4">
              <TDTextArea
                label="Description"
                name="description"
                placeholdertext="Enter product description"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-[#390dff] !text-white p-3 rounded-3xl cursor-pointer"
            >
              Add Product
            </button>
          </TDForm>
        </div>
      </div>
    </div>
  );
};

export default Page;
