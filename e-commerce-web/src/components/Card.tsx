"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { HeartIconSvg } from "./HeartIcon";
import Image from "next/image";

import Link from "next/link";
import { savedProduct } from "@/app/Save/page";
import { productItem } from "./types";

type Props = {
  like: boolean;
  setLike: (value: boolean) => void;
  uploadShoppingCart: productItem[];
  setUpdateShoppingCart: (value: productItem[]) => void;
  cookie: boolean;
  setCookie: (value: boolean) => void;
};
export const Context = createContext<Props | null>(null);

export type ProductType =
  | {
      productName: string;
      price: number;
      size: string[];
      productId: number;
      categoryId: string;
      qty: number;
      thumbnails: string;
      images: string[];
      coupon: string;
      salePercent: number;
      description: string;
      viewCount: number;
      createAt: Date;
      updateAt: Date;
      categoryType: string;
      productTag: string;
      _id: string;
      color: string[];
    }
  | undefined;
export const Card = ({
  cardItems,
  index,
}: {
  cardItems: ProductType;
  index: number;
}) => {
  const [ready, setReady] = useState(false);
  const [savedProduct, setSavedProduct] = useState<savedProduct[]>([]);
  const value = useContext(Context);
  if (!savedProduct) return;

  const SaveProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/Save", {
        method: "POST",
        body: JSON.stringify({
          ProductId: cardItems?._id,
          amount: cardItems?.price,
          name: cardItems?.productName,
          image: cardItems?.images[0],
          heart: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      value?.setLike(!value.like);
      const data = await response.json();
      setReady(true);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteProduct = async () => {
    try {
      await fetch(`http://localhost:4000/saved/${cardItems?._id}`, {
        method: "DELETE",
      });
      setReady(false);
      value?.setLike(!value.like);
    } catch (err) {
      console.error(err);
    }
  };

  const SavedProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/Save`);
      const data = await response.json();
      const has = data.findIndex(
        (item: savedProduct) => item.ProductId == cardItems?._id
      );
      if (has !== -1) {
        setReady(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    SavedProduct();
  }, []);

  return (
    <div className="relative">
      <Link
        href={`/ProductDetail?id=${cardItems?._id}`}
        className="w-full flex flex-col gap-2 group"
      >
        <div className="rounded-2xl bg-slate-400 aspect-[3/4] overflow-hidden relative hover:border-black border-[1px]">
          <Image
            alt="product_image"
            src={cardItems?.images[0] || ""}
            width={500}
            height={500}
            className="bg-slate-50 absolute w-full transition-[6s] object-cover h-full inset-0 group-hover:scale-150"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{cardItems?.productName}</div>
          <div className="font-bold">{cardItems?.price}</div>
        </div>
      </Link>
      <div
        onClick={() => {
          ready ? deleteProduct() : SaveProduct();
        }}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <HeartIconSvg fill={ready} />
      </div>
    </div>
  );
};

export default Card;
