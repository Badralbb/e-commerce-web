"use client";

import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useFormik, FormikErrors, Field } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import Link from "next/link";

import { DashboardAside } from "@/components/Dashboard";
import { AddImage } from "@/components/addImage";
import { AddProductName } from "@/components/addProductName";
import { AddPrice } from "@/components/addPrice";
import { AddCategory } from "@/components/addCategory";
import Image from "next/image";

export const sizes: string[] = ["Free", "S", "M", "L", "XL", "2XL", "3Xl"];

export const colors = [
  { color: "blue", Value: "#4c4efd" },
  { color: "red", Value: "#f23838" },
  { color: "yellow", Value: "#ecb442" },
  { color: "green", Value: "#00ff00" },
  { color: "brown", Value: "#94463c" },
  { color: "black", Value: "#151f2e" },
  { color: "white", Value: "#fffbfc" },
];
export type FormValues = {
  productName: string;
  description: string;
  productCode: number;
  qty: number;
  price: number;
  categoryType: string;
  productTag: string;
};
const AddProduct = () => {
  const searchParams = useSearchParams();
  let edit = searchParams.get("id");
  const router = useRouter();

  const updateProduct = async (values: FormValues) => {
    await fetch(`http://localhost:4000/products/${edit}`, {
      method: "PUT",
      body: JSON.stringify({
        productName: values.productName,
        description: values.description,
        productId: values.productCode,
        price: values.price,
        qty: values.qty,
        categoryType: categoryType,
        productTag: values.productTag,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  const [oneProduct, setOneProduct] = useState<FormValues>();
  const [size, setSize] = useState(false);

  const [color, setColor] = useState(false);

  const [categoryType, setCategoryType] = useState("");

  const [showCategory, setShowCategory] = useState(false);

  const [productColor, setProductColor] = useState<string[]>([]);

  const [productSize, setProductSize] = useState<string[]>([]);

  const [uploadImage, setUploadImage] = useState<string[]>([]);

  const [image, setImage] = useState<FileList | null>(null);

  const [loader, setLoader] = useState(false);

  const [files, setFiles] = useState<FileList | null>();

  const [create, setCreate] = useState("");

  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const imageURls: string[] = [];

  const initialValues = {
    productName: "",
    description: "",
    productCode: 0,
    qty: 0,
    price: 0,
    categoryType: "",
    productTag: "",
  };

  const validationSchema = yup.object({
    productName: yup.string().min(4).required("Барааны нэрээ оруулна уу"),
    description: yup.string(),
    productCode: yup.number().min(1, "Барааны кодоо оруулна уу"),
    price: yup.number().min(500, `Барааны үнийг заавал оруулна уу`),
    qty: yup.number().min(1, "Барааны тоогоо заавал оруулна уу"),
    productTag: yup.string().required("заавал оруулна уу"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      setLoader(true);
      if (edit) {
        updateProduct(values);
      } else {
        AddItems(values);
        resetForm();
      }
      setLoader(false);
    },

    validationSchema,
  });
  const handleUpload = async () => {
    if (!image?.length) return;
    console.log({ image });
    const imageArray = [...uploadImage];
    for (let i = 0; i < image.length; i++) {
      const formDate = new FormData();
      formDate.append("image", image[i]);
      try {
        const response = await fetch(`http://localhost:4000/upload`, {
          method: "POST",
          body: formDate,
        });
        const data = await response.json();

        imageArray.push(data.secure_url);

        console.log({ imageArray });
      } catch (err) {
        console.error(err);
      }
    }
    return imageArray;
  };
  const AddItems = async (values: FormValues) => {
    const images = await handleUpload();
    await fetch("http://localhost:4000/products", {
      method: "POST",
      body: JSON.stringify({
        productName: values.productName,
        description: values.description,
        productId: values.productCode,
        price: values.price,
        qty: values.qty,
        categoryType: categoryType,
        productTag: values.productTag,
        color: productColor,
        size: productSize,
        images: images,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    reset();
  };
  const reset = () => {
    setImageURLs([]);
    setUploadImage([]);
    setCategoryType("");
    setProductColor([]);
    setProductSize([]);
    setImage(null);
  };

  const getOneProduct = async () => {
    const response = await fetch(`http://localhost:4000/products/${edit}`);
    const data = await response.json();
    formik.setValues({
      productName: data.productName,
      description: data.description,
      productCode: data.productId,
      qty: data.qty,
      price: data.price,
      categoryType: data.categoryType,
      productTag: data.productTag,
    });

    setProductColor(data.color);
    setProductSize(data.size);
  };
  if (edit) {
    useEffect(() => {
      getOneProduct();
    }, []);
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex">
        <DashboardAside />
        <div className="w-full text-nowrap bg-[#F7F7F8]">
          <div className="flex py-4 bg-[#ffffff] items-center">
            <Link
              href={"/dashboard/product"}
              className="px-4 hover:cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1682 2.48752C13.7598 2.07919 13.1015 2.07919 12.6932 2.48752L5.76816 9.41252C5.44316 9.73752 5.44316 10.2625 5.76816 10.5875L12.6932 17.5125C13.1015 17.9209 13.7598 17.9209 14.1682 17.5125C14.5765 17.1042 14.5765 16.4459 14.1682 16.0375L8.13483 9.99586L14.1765 3.95419C14.5765 3.55419 14.5765 2.88752 14.1682 2.48752Z"
                  fill="#121316"
                />
              </svg>
            </Link>
            <div className="flex-1">Бүтээгдэхүүн нэмэх</div>
          </div>
          <div className="flex gap-5 px-6 mt-8">
            <div className="flex flex-col gap-6 flex-1">
              <AddProductName
                valueTouched={formik.touched}
                values={formik.values}
                valuesChange={formik.handleChange}
                valueError={formik.errors}
              />
              <AddImage
                imageURLs={imageURLs}
                setImageURLs={setImageURLs}
                valueTouched={formik.touched}
                create={create}
                setCreate={setCreate}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                setImage={setImage}
                image={image}
              />
              <AddPrice
                valueTouched={formik.touched}
                values={formik.values}
                valuesChange={formik.handleChange}
                valueError={formik.errors}
              />
            </div>
            <AddCategory
              valueTouched={formik.touched}
              categoryType={categoryType}
              setCategoryType={setCategoryType}
              values={formik.values}
              valuesChange={formik.handleChange}
              setShowCategory={setShowCategory}
              showCategory={showCategory}
              color={color}
              setColor={setColor}
              size={size}
              setSize={setSize}
              productColor={productColor}
              productSize={productSize}
              setProductSize={setProductSize}
              setProductColor={setProductColor}
              valueError={formik.errors}
            />
          </div>
          <div className="flex justify-end gap-6 px-6 mt-[21px] items-center mb-[106px]">
            <Button
              type="submit"
              className="bg-[#FFFFFF] text-black border-[1px]"
            >
              Ноорог
            </Button>
            <Button type="submit">{edit ? "засах" : "нийтлэх"}</Button>
            {loader && (
              <Image
                src={"/spinner.png"}
                width={50}
                height={50}
                className="w-3 h-3"
                alt="loader"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
