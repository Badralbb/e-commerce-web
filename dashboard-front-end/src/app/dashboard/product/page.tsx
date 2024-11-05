"use client";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash, TrashIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DashboardAside } from "@/components/Dashboard";
import { filters } from "@/components/DashboardSelect";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ProductType =
  | {
      productName: string;
      price: number;
      size: string[];
      productId: number;
      categoryId: string;
      qty: number;
      thumbnails: string;
      images: string;
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

const Product = () => {
  const includesArray = [];
  const [categoryTypeValue, setCategoryTypeValue] = useState("Бүгд");

  const [readProduct, setReadProduct] = useState<ProductType[]>([]);

  const [showCategories, setShowCategories] = useState(false);

  const [showPriceLimit, setShowPriceLimit] = useState(false);

  const [lowPrice, setLowPrice] = useState(0);

  const [highPrice, setHighPrice] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>();

  const [deleteList, setDeleteList] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const loadProduct = async () => {
    if (lowPrice && highPrice) {
      const response = await fetch(
        `http://localhost:4000/products?lowprice=${lowPrice}&highprice=${highPrice}&fromDate=${date?.from}&toDate=${date?.to}`
      );
      const data = await response.json();
      setReadProduct(data);
    } else {
      const response = await fetch(
        `http://localhost:4000/products?fromDate=${date?.from}&toDate=${date?.to}`
      );
      const data = await response.json();
      setReadProduct(data);
    }
  };

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
    });
    loadProduct();
  };

  const loadFiltProduct = async () => {
    // if (categoryTypeValue === "Бүгд") {
    //   loadProduct();
    //   return;
    // }
    if (categoryTypeValue !== "Бүгд" || lowPrice || highPrice || date) {
      const response = await fetch(
        `http://localhost:4000/filtproduct?categoryType=${categoryTypeValue}&lowprice=${lowPrice}&highprice=${highPrice}&fromDate=${date?.from}&toDate=${date?.to}`
      );
      const data = await response.json();
      setReadProduct(data);
    }
  };

  if (categoryTypeValue === "Бүгд") {
    useEffect(() => {
      loadProduct();
    }, [lowPrice, highPrice, date]);
  } else {
    useEffect(() => {
      loadFiltProduct();
    }, [categoryTypeValue, lowPrice, highPrice, date]);
  }
  const deleteAll = (id: string) => {
    if (deleteList.includes(id)) {
      const changedDeleteList = deleteList.filter((item) => item !== id);
      setDeleteList(changedDeleteList);
    } else {
      const newDeleteItems = [...deleteList];
      newDeleteItems.push(id);
      setDeleteList(newDeleteItems);
    }
  };

  const deleteAllItem = async () => {
    try {
      await fetch(`http://localhost:4000/products`, {
        method: "DELETE",
        body: JSON.stringify({ deleteList }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      loadProduct();
      setDeleteList([]);
    } catch (err) {
      console.error(err);
    }
  };

  const searchFilt = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="flex min-h-screen text-nowrap">
      <div className="bg-[#FFFFFF] w-[222px]">
        <DashboardAside />
      </div>

      <div className="bg-[#f7f7f8] flex flex-col gap-6 w-full">
        <div className="flex border-b-[1px]">
          <div className="p-4 border-b-2 border-black hover:cursor-pointer">
            Бүтээгдэхүүн
          </div>
          <div className="p-4 hover:cursor-pointer">Ангилал</div>
        </div>
        <Link
          href={"/dashboard/addproduct"}
          className="flex gap-1 bg-[#121316] px-[45px] py-3 hover:bg-blend-darken ml-6 rounded-[8px] max-w-[280px] w-full items-center hover:cursor-pointer "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
          </svg>

          <div className="text-[#FFFFFF]">Бүтээгдэхүүн нэмэх</div>
        </Link>
        <div className="flex flex-col gap-4 ml-6">
          <div className="flex justify-between">
            <div className="flex gap-[13px]">
              <div className="relative">
                <div
                  onClick={() => setShowCategories(true)}
                  className="flex gap-1 bg-[#FFFFFF] rounded-[8px] hover:cursor-pointer py-2 px-3"
                >
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 2L6 11H17L11.5 2ZM11.5 5.84L13.43 9H9.56L11.5 5.84ZM17 13C14.51 13 12.5 15.01 12.5 17.5C12.5 19.99 14.51 22 17 22C19.49 22 21.5 19.99 21.5 17.5C21.5 15.01 19.49 13 17 13ZM17 20C15.62 20 14.5 18.88 14.5 17.5C14.5 16.12 15.62 15 17 15C18.38 15 19.5 16.12 19.5 17.5C19.5 18.88 18.38 20 17 20ZM2.5 21.5H10.5V13.5H2.5V21.5ZM4.5 15.5H8.5V19.5H4.5V15.5Z"
                        fill="#121316"
                      />
                    </svg>
                  </div>
                  <div>Ангилал</div>
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.59 8.29504L12 12.875L7.41 8.29504L6 9.70504L12 15.705L18 9.70504L16.59 8.29504Z"
                        fill="#121316"
                      />
                    </svg>
                  </div>
                </div>
                {showCategories && (
                  <div className="absolute bg-[#FFFFFF] z-20 w-full text-center top-10">
                    {filters.map((filter) => (
                      <div
                        key={filter.value}
                        onClick={() => {
                          setShowCategories(false);
                          setCategoryTypeValue(filter.value);
                        }}
                        className="p-2 border-[1px] cursor-pointer rounded-xl"
                      >
                        {filter.filt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relatvie">
                <div
                  onClick={() => {
                    showPriceLimit
                      ? setShowPriceLimit(false)
                      : setShowPriceLimit(true);
                  }}
                  className="flex gap-1 bg-[#FFFFFF] rounded-[8px] py-2 px-3 hover:cursor-pointer"
                >
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3899 10.9C10.1199 10.31 9.38991 9.7 9.38991 8.75C9.38991 7.66 10.3999 6.9 12.0899 6.9C13.8699 6.9 14.5299 7.75 14.5899 9H16.7999C16.7299 7.28 15.6799 5.7 13.5899 5.19V3H10.5899V5.16C8.64991 5.58 7.08991 6.84 7.08991 8.77C7.08991 11.08 8.99991 12.23 11.7899 12.9C14.2899 13.5 14.7899 14.38 14.7899 15.31C14.7899 16 14.2999 17.1 12.0899 17.1C10.0299 17.1 9.21991 16.18 9.10991 15H6.90991C7.02991 17.19 8.66991 18.42 10.5899 18.83V21H13.5899V18.85C15.5399 18.48 17.0899 17.35 17.0899 15.3C17.0899 12.46 14.6599 11.49 12.3899 10.9Z"
                        fill="#121316"
                      />
                    </svg>
                  </div>
                  <div>Үнэ</div>
                  <div>
                    {" "}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.59 8.29504L12 12.875L7.41 8.29504L6 9.70504L12 15.705L18 9.70504L16.59 8.29504Z"
                        fill="#121316"
                      />
                    </svg>
                  </div>
                </div>
                {showPriceLimit && (
                  <div className="absolute bg-[#ffffff] z-20">
                    <Input
                      className="p-2"
                      placeholder="enter low price"
                      type="number"
                      value={lowPrice === 0 ? "" : lowPrice}
                      onChange={(e) => {
                        setLowPrice(Number(e.target.value));
                      }}
                    />
                    <Input
                      onChange={(e) => {
                        setHighPrice(Number(e.target.value));
                      }}
                      type="number"
                      className="p-2"
                      placeholder="enter high price"
                      value={highPrice === 0 ? "" : highPrice}
                    />
                  </div>
                )}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              {deleteList.length > 0 && (
                <div className="hover:cursor-pointer">
                  <TrashIcon onClick={deleteAllItem} />
                </div>
              )}
            </div>
            <div className="mr-7 relative">
              <Input
                value={searchValue}
                onChange={(e) => searchFilt(e)}
                placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
              />
              <div className="absolute top-10 w-full z-50 flex flex-col gap-1">
                {searchValue &&
                  readProduct.map(
                    (product) =>
                      product?.productName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) && (
                        <div
                          onClick={() => {
                            setCategoryTypeValue(product.categoryType);
                            setHighPrice(product.price + 1);
                            setLowPrice(product.price - 1);
                          }}
                          className="flex gap-1 border-2 rounded-lg shadow-2xl items-center cursor-pointer bg-slate-200"
                        >
                          <Avatar>
                            <AvatarImage src={product.images[0]} alt="image" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>{product.productName}</div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
          <div>
            <Table className="bg-[#FFFFFF] border-b-[1px] rounded-xl">
              <TableHeader>
                <TableRow>
                  <TableHead> </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                    Бүтээгдэхүүн
                  </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                    Ангилал
                  </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                    Үнэ
                  </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                    Үлдэгдэл
                  </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                    Зарагдсан
                  </TableHead>
                  <TableHead className="max-w-[156px]  px-5 py-[14px]">
                     Нэмсэн огноо
                  </TableHead>
                  <TableHead className="max-w-[104px]  px-6 py-[14px]">
                     
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readProduct.map(
                  (product: ProductType) =>
                    product && (
                      <TableRow key={product._id}>
                        <TableCell className="px-6 py-[26px] max-w-[156px]">
                          <Checkbox
                            onClick={() => deleteAll(product._id)}
                            checked={deleteList.includes(product._id)}
                          />
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px] flex items-center gap-2">
                          {product.images[0] && (
                            <Avatar>
                              <AvatarImage
                                src={product.images[0]}
                                alt="image"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          )}
                          <div>{product.productName}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px]">
                          {product.categoryType}
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px]">
                          {" "}
                          {product.price + " ₮"}
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px]">
                          {product.qty}
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px]">
                          {product.qty}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {dayjs(product.createAt).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell className="px-6 py-4 flex gap-4 items-center">
                          <div onClick={() => deleteProduct(product._id)}>
                            <Trash className="text-[#1C20243D] hover:cursor-pointer" />
                          </div>
                          <Link
                            href={`/dashboard/addproduct?id=${product._id}`}
                          >
                            <EditIcon className="text-[#1C20243D] hover:cursor-pointer" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
