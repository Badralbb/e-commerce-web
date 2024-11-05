"use client";

import { useContext, useEffect, useState } from "react";

import { BasketCard } from "@/components/BasketCard";
import { Context } from "@/components/Card";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
export default function Home() {
  const value = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const totalPrice = () => {
    let sum = 0;
    value?.uploadShoppingCart.forEach((product) => {
      if (product.price) {
        sum = sum + product.price * product.productCount;
      }
    });
    return sum;
  };
  useEffect(() => {
    totalPrice();
  }, [quantity]);

  const getShoppingCart = async () => {
    const basketProducts = JSON.parse(
      localStorage.getItem("basketProducts") || "[]"
    );

    value?.setUpdateShoppingCart(basketProducts);
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/Login");
    }
    getShoppingCart();
  }, []);

  return (
    <div className="bg-[#F7F7F8]">
      <div className="max-w-[1040px] mx-auto pt-[52px] pb-[100px] bg-[#F7F7F8]">
        <div className="">
          <div className="w-[256px] h-[32px] mx-auto flex items-center justify-center mb-[66px] ">
            <div className="h-[32px] w-[32px] rounded-full font-bold bg-blue-500 text-center p-[4px] text-white border-[1px]">
              1
            </div>
            <div className="w-[80px] h-[1px] bg-black top-7"></div>
            <div className="h-[32px] w-[32px] rounded-full bg-white border-[1px] p-[4px] border-black text-center items-center text-[#09090B]">
              2
            </div>
            <div className="w-[80px] h-[1px] bg-black top-7"></div>
            <div className="h-[32px] w-[32px] rounded-full bg-white border-[1px] p-[4px] border-black text-center items-center text-[#09090B]">
              3
            </div>
          </div>
          <div className="w-[638px] h-[] rounded-2xl mx-auto p-[32px]  bg-white">
            <div className="text-xl font-bold">1. Сагс </div>
            <div className="flex flex-col gap-[16px] mt-[16px]">
              {value?.uploadShoppingCart.map((cardItems, index) => (
                <div key={cardItems.price * cardItems.productCount * index}>
                  <BasketCard
                    index={index}
                    getShoppingCart={getShoppingCart}
                    cardItems={cardItems}
                    uploadShoppingCart={value.uploadShoppingCart}
                    setUploadShoppingCart={value.setUpdateShoppingCart}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <div> Нийт төлөх дүн: </div>
              <div className="font-bold ">
                {totalPrice()}
                <div className="font-bold"></div>
              </div>
            </div>
            <div className="justify-between flex ">
              <div className=""></div>
              <Button
                onClick={() => {
                  router.push(`/Basket/Address`);
                }}
                className="w-[175px] h-[36px] rounded-2xl bg-[#2563EB] text-center px-[36px] py-[8px] text-[14px] text-white  mt-[36px]"
                rel="address"
              >
                Худалдан авах
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
