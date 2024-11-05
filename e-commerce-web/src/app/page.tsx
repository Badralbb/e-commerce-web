"use client";

import Image from "next/image";

import { CardContent, CardShadcn } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useContext, useEffect, useState } from "react";
import Card, { Context } from "@/components/Card";

type ProductType = {
  _id: string;
  productName: string;
  color: [string];
  size: [string];
  price: number;
  productId: number;
  categoryId: string;
  qty: number;
  thumbnails: string;
  images: [string];
  coupon: string;
  salePercent: number;
  description: string;
  viewCount: number;
  createAt: Date;
  updateAt: Date;
  categoryType: string;
  productTag: string;
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const value = useContext(Context);
  const loadProduct = async () => {
    const response = await fetch(
      `http://localhost:4000/products?fromDate=undefined&toDate=undefined`
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="max-w-[1040px] mx-auto pt-[52px] pb-[100px]">
      <div className="w-[1040px] h-[446px] mb-[20px]">
        <Carousel className=" ">
          <CarouselContent>
            {products.map(
              (product: ProductType, index) =>
                index < 5 && (
                  <CarouselItem key={product._id}>
                    <CardShadcn>
                      <CardContent className="flex items-center justify-center ">
                        {product.images[0] && (
                          <div className="relative">
                            <Image
                              className=" rounded-lg object-cover w-[1040px] h-[446px]"
                              width={2000}
                              height={2000}
                              src={product.images[0]}
                              alt="item"
                            />
                            <div className="flex flex-col gap-1 absolute bottom-[32px] left-[32px]">
                              <div className="text-[18px]">
                                {product.productName}
                              </div>
                              <div className="font-bold text-[36px]">
                                {product.price}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </CardShadcn>
                  </CarouselItem>
                )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="grid">
        <div className="flex-1 grid grid-cols-4 gap-x-[21px] gap-y-12">
          {products.map(
            (cardItems: ProductType, index) =>
              cardItems &&
              index < 18 && (
                <div
                  key={index + cardItems.price}
                  className={` ${
                    index == 6 ? " col-start-3 col-span-2 row-span-2" : ""
                  } ${index == 7 ? " col-start-1 col-span-2 row-span-2" : ""}`}
                >
                  <Card index={index} cardItems={cardItems} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
