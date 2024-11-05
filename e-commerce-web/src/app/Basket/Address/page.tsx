"use client";

import { Card, Context } from "@/components/Card";
import SidebarProducts from "@/app/datas.json";
import Image from "next/image";
import Link from "next/link";
import { use, useContext, useEffect, useState } from "react";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BasketCard } from "@/components/BasketCard";

import { SidebarCard } from "@/components/SidebarCard";

import { useFormik } from "formik";
import { FormValues } from "@/components/types";

type paymentStatus = "Paid" | "Not paid";
type paymentType = "Card" | "Qpay" | "SocialPay";
type PaymentType = {
  _id: string;
  orderNumber: string;
  paymentStatus: paymentStatus;
  paymentType: paymentType;
  createdAt: Date;
  updateAt: Date;
  paymentAmount: number;
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [counting, setCounting] = useState(0);
  const paymentStatus = "Paid";
  const paymentType = "card";
  const value = useContext(Context);
  //// address
  const [address, setAddress] = useState(0);
  const id = "67064b67a760fd650c53810c";
  const initialValues = {
    lastName: "",
    firstName: "",
    phoneNumber: 0,
    address: "",
    description: "",
  };
  const validationSchema = yup.object({
    lastName: yup.string().min(4).required("Овогоо оруулна уу"),
    firstName: yup.string().min(2).required("Нэрээ оруулна уу"),
    phoneNumber: yup.number().min(8).required("утасны дугаараа оруулна уу"),
    address: yup.string().min(20).required(`гэрийн хаягаа оруулна уу`),
    description: yup.string().min(0, "Нэмэлт мэдээллээ оруулна уу"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      editAddress(values);
    },

    validationSchema,
  });
  function submit() {
    fetch(`https://localhost:4000/updateUser/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        address,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
      } else {
        console.log("error");
      }
    });
  }

  const [deleteAddress, setDeleteAddresses] = useState(0);

  const [updateAddress, setUpdateAddresses] = useState(0);

  const getAddress = async () => {
    const response = await fetch(`http://localhost:4000/register`);
    const data = await response.json();
    setAddress(data);
  };
  useEffect(() => {
    getAddress();
  }, []);

  const editAddress = async (values: FormValues) => {
    const response = await fetch(`http://localhost:4000/updateUser/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        values,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setUpdateAddresses(data);
  };

  const [loadpayment, setLoadPayment] = useState<PaymentType[]>();

  const getPayment = async () => {
    const response = await fetch(`http://localhost:4000/getPayments`);
    const data = await response.json();
    setLoadPayment(data);
    console.log(setLoadPayment);
  };
  useEffect(() => {
    getPayment();
    // updatePayment();
    createPayment();
  }, []);

  const createPayment = async () => {
    const data = await fetch(`http://localhost:4000/buy`, {
      method: "POST",
      body: JSON.stringify({
        paymentType,
        paymentStatus,
        paymentAmount: Math.floor(Math.random() * 100000),
        orderNumber: Math.floor(Math.random() * 50000),
        userId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  //// payment

  const getShoppingCart = async () => {
    const basketProducts = JSON.parse(
      localStorage.getItem("basketProducts") || "[]"
    );
    value?.setUpdateShoppingCart(basketProducts);
  };
  useEffect(() => {
    getShoppingCart();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="bg-[#F7F7F8]">
      <div className="max-w-[1040px] mx-auto pt-[52px] pb-[100px] bg-[#F7F7F8]">
        <div className="w-[256px] h-[32px] mx-auto flex items-center justify-center mb-[66px] ">
          <div className="h-[32px] w-[32px] rounded-full font-bold bg-blue-500  text-white text-center p-[4px] border-[1px]">
            ✓
          </div>
          <div className="w-[80px] h-[1px] bg-black top-7"></div>
          <div className="h-[32px] w-[32px] rounded-full font-bold bg-blue-500  text-white p-[4px] border-black text-center items-center">
            2
          </div>
          <div className="w-[80px] h-[1px] bg-black top-7"></div>
          <div className="h-[32px] w-[32px] rounded-full bg-white border-[1px] p-[4px] border-black text-center items-center text-[#09090B]">
            3
          </div>
        </div>
        <div className="max-w-full h-[678px] flex gap-[20px]  mx-auto ">
          <div className="w-[333px] rounded-2xl bg-white px-[24px] py-[32px] ">
            <div className="font-bold">Сагс</div>
            <div className="flex flex-col gap-[16px] mt-[16px] items-center">
              {value?.uploadShoppingCart.map((cardItems, index) => (
                <div key={cardItems.price * cardItems.productCount * index}>
                  <SidebarCard
                    // getShoppingCart={getShoppingCart}
                    cardItems={cardItems}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[687px] h-[678px] rounded-2xl gap-[24px] bg-white p-[32px]">
            <div className=" text-[#09090B] mb-[36px]">
              2. Хүргэлтийн мэдээлэл оруулах
            </div>
            <div className="w-[623px] h-[478px] flex flex-col gap-[24px]">
              <div className="h-[50px]">
                <div>Овог:</div>
                <div>
                  <Input
                    className="h-[28px] rounded-[18px]"
                    type="text"
                    placeholder=""
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  <p
                    className={`${
                      formik.errors.lastName ? "block" : "hidden"
                    } text-red-500`}
                  >
                    {formik.errors.lastName}
                  </p>
                </div>
              </div>
              <div className="h-[50px]">
                <div>Нэр:</div>
                <div>
                  <Input
                    id="firstName"
                    className="h-[28px] rounded-[18px]"
                    type="text"
                    placeholder=""
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  <p
                    className={`${
                      formik.errors.firstName ? "block" : "hidden"
                    } text-red-500`}
                  >
                    {formik.errors.firstName}
                  </p>
                </div>
              </div>
              <div className="h-[50px]">
                <div>Утасны дугаар:</div>
                <div>
                  <Input
                    id="phoneNumber"
                    className="h-[28px] rounded-[18px]"
                    type="number"
                    placeholder=""
                    value={
                      formik.values.phoneNumber ? formik.values.phoneNumber : ""
                    }
                    onChange={formik.handleChange}
                  />
                  <p
                    className={`${
                      formik.errors.phoneNumber ? "block" : "hidden"
                    } text-red-500`}
                  >
                    {formik.errors.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="h-[116px]">
                <div>Хаяг:</div>
                <div>
                  <Input
                    id="address"
                    className="h-[94px] rounded-[18px]"
                    type="text"
                    placeholder=""
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  <p
                    className={`${
                      formik.errors.address ? "block" : "hidden"
                    } text-red-500`}
                  >
                    {formik.errors.address}
                  </p>
                </div>
              </div>
              <div className="h-[50px]">
                <div>Нэмэлт мэдээлэл:</div>
                <div>
                  <Input
                    id="description"
                    className="h-[94px] rounded-[18px]"
                    type="text"
                    placeholder=""
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <p
                    className={`${
                      formik.errors.description ? "block" : "hidden"
                    } text-red-500`}
                  >
                    {formik.errors.description}
                  </p>
                  <div className="text-[#71717A]">
                    Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                  </div>
                  <div className="flex justify-between mt-[24px]">
                    <Link
                      className="w-[114px] h-[36px] rounded-2xl border-[1px] border-[#E4E4E7] text-center px-[36px] py-[8px] text-[14px]"
                      rel="address"
                      href="/Basket"
                    >
                      Буцах
                    </Link>

                    <Button
                      type="submit"
                      className="bg-white rounded-[18px] text-slate-300 hover:bg-slate-500"
                    >
                      Хүргэлтийн мэдээллийг шинэчлэх
                    </Button>

                    <Link
                      className="bg-[#2563EB] rounded-[18px] w-[166px] hover:bg-slate-200 hover:text-black h-[36px] text-white px-[29px] py-[5px] text-[14px]"
                      rel="address"
                      href="/Basket/Pay"
                    >
                      Төлбөр төлөх
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
