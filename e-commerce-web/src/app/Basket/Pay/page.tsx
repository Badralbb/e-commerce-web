"use client";

import { Card } from "@/components/Card";
import basketProducts from "@/app/datas.json";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BasketCard } from "@/components/BasketCard";

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

  let sum = 0;
  basketProducts.forEach((product) => {
    sum = sum + product.price;
  });

  {
    /* payment backend holboh  */
  }
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

  // const updatePayment = async () => {
  //   const data = await fetch(`http://localhost:4000/updatePayment${search}` ,{
  //     method: "PUT",
  //     body: JSON.stringify({
  //       paymentType,

  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     }
  //   });
  // }
  const createPayment = async () => {
    const data = await fetch(`http://localhost:4000/buy`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className="bg-[#F7F7F8]">
      <div className="max-w-[1040px] mx-auto pt-[52px] pb-[100px]">
        {/* page 3 */}

        <div className="w-[256px] h-[32px] mx-auto flex items-center justify-center mb-[66px] ">
          <div className="h-[32px] w-[32px] rounded-full font-bold bg-blue-500  text-white text-center p-[4px] border-[1px]">
            ✓
          </div>
          <div className="w-[80px] h-[1px] bg-black top-7"></div>
          <div className="h-[32px] w-[32px] rounded-full font-bold bg-blue-500  text-white p-[4px] border-black text-center items-center">
            ✓
          </div>
          <div className="w-[80px] h-[1px] bg-black top-7"></div>
          <div className="h-[32px] w-[32px] rounded-full p-[4px] text-center items-center font-bold bg-blue-500  text-white">
            3
          </div>
        </div>
        <div className="w-[687px] h-[656.75px] mx-auto p-[32px] rounded-2xl flex flex-col gap-3 bg-white">
          <div>3. Төлбөр төлөлт </div>
          <div>
            <Image
              alt="pay"
              src={"/Pay.png"}
              width={600}
              height={480}
              className="bg-slate-50 "
            />
          </div>
          <div>
            <Link
              className="w-[114px] h-[36px] rounded-2xl border-[1px] border-[#E4E4E7] text-center px-[36px] py-[8px] text-[14px]"
              rel="address"
              href="/Basket/Address"
            >
              Буцах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
