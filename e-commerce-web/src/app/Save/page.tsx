"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
// import { HeartIcon } from "@radix-ui/react-icons";
import { HeartIconSvg } from "@/components/HeartIcon";
import { Context } from "@/components/Card";

const save = [
  {
    title: "Chunky Glyph Tee",
    image: "/asian.png",
    price: "120.000₮",
  },
  {
    title: "Doodle Hoodie",
    image: "/black.png",
    price: "100.000₮",
  },
  {
    title: "Local Styles Crewneck",
    image: "/latino.png",
    price: "80.000₮",
  },
];

export type savedProduct = {
  name: string;
  amount: number;
  ProductId: string;
  image: string;
  _id: string;
  heart: boolean;
};

export default function Save() {
  const value = useContext(Context);
  const [heart, setHeart] = useState(true);
  const [cards, setCards] = useState();
  const [savedProduct, setSavedProduct] = useState<savedProduct[]>([]);
  // const savedCount = cards.length;

  // useEffect(()=>{
  //    setHeart(true)
  // },[])
  const loadSavedProduct = async () => {
    const response = await fetch("http://localhost:4000/Save");
    const data = await response.json();
    setSavedProduct(data);
  };

  const deleteSavedProduct = async (id: string) => {
    await fetch(`http://localhost:4000/Save/${id}`, {
      method: "DELETE",
    });
    value?.setLike(!value.like);
    loadSavedProduct();
  };

  useEffect(() => {
    loadSavedProduct();
  }, []);

  return (
    <div className="max-w-[622px] mx-auto">
      <div>
        <p className="text-xl font-bold p-3">
          Хадгалсан бараа {savedProduct.length}
        </p>

        <div className="flex flex-col gap-2 pb-4">
          {savedProduct.map((title) => (
            <div
              key={title.name}
              className="flex justify-between border-2 rounded-xl"
            >
              <div className="flex gap-6 p-4">
                <Link href="/ProductTetails">
                  <Image
                    src={title.image}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-xl"
                  />
                </Link>

                <div className="flex flex-col gap-1">
                  <Link href="/ProductTetails">{title.name}</Link>
                  <p className="font-bold">{title.amount}</p>
                  <button
                    onClick={() => setHeart(false)}
                    className="bg-[#2563EB] w-[81px] h-[28px] rounded-3xl text-sm text-white"
                  >
                    Сагслах
                  </button>
                </div>
              </div>
              <div
                onClick={() => {
                  setHeart(false);
                  deleteSavedProduct(title._id);
                }}
                className="flex p-4 hover:cursor-pointer"
              >
                <HeartIconSvg fill={title.heart} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <HeartIconSvg fill={true} /> */
}
