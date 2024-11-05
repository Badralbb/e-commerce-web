"use client";

import { HeartIconSvg } from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import Card, { ProductType } from "@/components/Card";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { productItem } from "@/components/types";

const ProductDetail = () => {
  const [selectPhoto, setSelectPhoto] = useState("");
  const reset = () => {
    setNumber(1);
  };

  const productSize = [
    { size: "S", qty: 10 },
    { size: "M", qty: 10 },
    { size: "L", qty: 10 },
    { size: "XL", qty: 10 },
    { size: "2XL", qty: 10 },
  ];

  type reviewData = {
    productId: string;
    userId: string;
    rating: number;
    comments: string;
    _id: string;
  };

  const defaultSize = productSize.find((p) => p.qty > 0)?.size || "";
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [number, setNumber] = useState<number>(1);

  const currentQty =
    productSize.find((item) => item.size === selectedSize)?.qty || 0;

  useEffect(() => {
    if (currentQty === 0) {
      const availableSize =
        productSize.find((item) => item.qty > 0)?.size || "";
      setSelectedSize(availableSize);
      setNumber(1);
    }
  }, [currentQty, productSize]);

  const nemeh = () => {
    setNumber((oldNumber) =>
      oldNumber < currentQty ? oldNumber + 1 : oldNumber
    );
  };

  const hasah = () => {
    setNumber((oldNumber) => (oldNumber > 1 ? oldNumber - 1 : oldNumber));
  };

  const [ready, setReady] = useState(false);
  const filled = () => {
    setReady(!ready);
  };

  const [enable, setEnable] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const [uploadShoppingCart, setUploadShoppingCart] = useState<ProductType>();

  const getShoppingCart = async () => {
    const response = await fetch(`http://localhost:4000/products/${search}`);
    const data = await response.json();
    setUploadShoppingCart(data);
    setSelectPhoto(data.images[0]);
  };

  useEffect(() => {
    getShoppingCart();
    getReview();
    loadProduct();
  }, [search]);

  const render = () => {
    getReview();
  };

  const createShoppingCart = async () => {
    try {
      const existProduct = JSON.parse(
        localStorage.getItem("basketProducts") || "[]"
      );
      const existProductIndex = existProduct.findIndex(
        (item: productItem) => item.productId === search
      );
      if (
        existProductIndex !== -1 &&
        existProduct[existProductIndex].size === selectedSize
      ) {
        existProduct[existProductIndex].productCount += number;
      } else {
        const productItem = {
          productId: search,
          productCount: number,
          size: selectedSize,
          images: uploadShoppingCart?.images,
          price: uploadShoppingCart?.price
            ? uploadShoppingCart.price * number
            : uploadShoppingCart?.price,
          productName: uploadShoppingCart?.productName,
        };
        existProduct.push(productItem);
      }

      localStorage.setItem("basketProducts", JSON.stringify(existProduct));
      alert("Бараа амжилттай сагсанд орлоо");
    } catch (err) {
      console.error(err);
    }
  };

  const reseted = () => {
    setSelectedSize(""), setNumber(0);
    setCommentValue("");
  };

  const [commentValue, setCommentValue] = useState("");

  const createReview = async () => {
    await fetch(`http://localhost:4000/reviews`, {
      method: "POST",
      body: JSON.stringify({
        comments: commentValue,
        productId: search,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    reseted();
    render();
  };

  const [uploadReview, setUploadReview] = useState<reviewData[]>([]);
  const getReview = async () => {
    const response = await fetch(`http://localhost:4000/reviews/${search}`);
    const data = await response.json();
    setUploadReview(data);
  };

  const [products, setProducts] = useState<ProductType[]>([]);
  const loadProduct = async () => {
    const response = await fetch(
      `http://localhost:4000/products?fromDate=undefined&toDate=undefined`
    );
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div className="max-w-[1040px] mx-auto gap-5 pt-[52px] pb-20">
      <div className="flex justify-center gap-5 mb-20">
        <div className=" w-[509px] ">
          <div className=" flex gap-5 sticky top-10">
            <div className="mt-[100px] flex flex-col gap-3">
              {uploadShoppingCart?.images.map((item) => (
                <div
                  className={`w-[67px] h-[67px] rounded-[4px] bg-slate-400 ${
                    selectPhoto === item ? "border border-black" : " "
                  }`}
                  onClick={() => setSelectPhoto(item)}
                  key={item}
                >
                  <Image
                    className=" rounded-lg object-cover w-[67px] h-[67px]"
                    width={50}
                    height={50}
                    src={item}
                    alt="all side"
                  />
                </div>
              ))}
            </div>
            <div className="w-[422px] h-[521px] bg-slate-400 rounded-[16px] flex flex-col">
              <Image
                className=" rounded-lg object-cover w-[1040px] h-[446px]"
                width={426}
                height={641}
                src={selectPhoto}
                alt="choose photo"
              />
            </div>
          </div>
        </div>
        {/* 2nd section */}
        <div className="w-[511px]">
          {/* Product details and cart functionality */}
          {/* Your logic here... */}
        </div>
      </div>
    </div>
  );
};

// Suspense wrapper around the ProductDetail component
const ProductDetailPage = () => (
  <Suspense fallback={<div>Loading Product Details...</div>}>
    <ProductDetail />
  </Suspense>
);

export default ProductDetailPage;
