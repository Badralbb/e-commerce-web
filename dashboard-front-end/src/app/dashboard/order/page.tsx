"use client";
import { DashboardAside } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";
import { paymentType } from "../income/page";

const Order = () => {
  const orderStatus = [
    { name: "Бүгд", value: "all" },
    { name: "Шинэ захиалага", value: "new orders" },
    { name: "Бэлтгэгдэж байна", value: "prepared" },
    { name: "Хүргэлтэнд гарсан", value: "delivered" },
    { name: "Хүргэгдсэн", value: "done" },
    { name: "Цуцлагдсан", value: "cancelled" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("all")

  const [incomeFilter, setIncomeFilter] = useState("Өнөөдөр");
  const [uploadOrder, setUploadOrder] = useState<paymentType[]> ([])

  const loadFiltIncome = async () => {
    if (incomeFilter === "Өнөөдөр") {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 1);
      const response = await fetch(
        `http://localhost:4000/order?startTime=${startTime}&endTime=${endTime}`
      );
      const data = await response.json();
      setUploadOrder(data);
    }

    if (incomeFilter === "7хоног") {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 7);
      const response = await fetch(
        `http://localhost:4000/order?startTime=${startTime}&endTime=${endTime}`
      );
      const data = await response.json();
      setUploadOrder(data);
    }
    if (incomeFilter === "1сар") {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 30);
      const response = await fetch(
        `http://localhost:4000/order?startTime=${startTime}&endTime=${endTime}`
      );
      const data = await response.json();
      setUploadOrder(data);
    }
  };
  useEffect(() => {
    loadFiltIncome();
  }, [incomeFilter]);

  return (
    <div className="flex max-w-[1440px] mx-auto">
      <DashboardAside />
      <div className="flex flex-col w-full">
        <div className="flex font-normal text-sm text-[#3F4145]">
          {orderStatus.map((item) => (
            <div key={item.name} className="p-4 cursor-pointer">
              {item.name}
            </div>
          ))}
        </div>
        <div className="mx-[23.5px] mt-[34px] mb-6 flex justify-between ">
          <div className="flex  gap-2">
            <Button
              onClick={() => {
                setIncomeFilter("Өнөөдөр");
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === "Өнөөдөр"
                  ? "bg-[#18BA51] text-white"
                  : "bg-white text-black"
              }  w-[94px] border-[#ECEDF0] hover:bg-[#18BA51] hover:font-bold hover:text-white border-[1px]  h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              Өнөөдөр
            </Button>
            <Button
              onClick={() => {
                setIncomeFilter("7хоног");
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === "7хоног"
                  ? "bg-[#18BA51] text-white"
                  : "bg-white text-black"
              }  w-[94px] border-[#ECEDF0] hover:bg-[#18BA51] hover:font-bold hover:text-white border-[1px] h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              7 хоног
            </Button>

            <Button
              onClick={() => {
                setIncomeFilter("1сар");
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === "1сар"
                  ? "bg-[#18BA51] text-white"
                  : "bg-white text-black"
              }  w-[94px] border-[#ECEDF0] hover:bg-[#18BA51] hover:font-bold hover:text-white border-[1px] h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              1 сар
            </Button>
          </div>
          <div className="flex items-center gap-1 px-2 rounded-[8px] border-[#D6D8DB] border">
            <Search className="" />
            <Input
              className="w-[302px] h-9 outline-none resize-none border-none shadow-none text-sm font-normal focus-visible:ring-0 "
              type="input"
              placeholder="Бүтээгдэхүүн хайх"
            />
          </div>
        </div>
        <div className="rounded-[12px] shadow-xl border border-[#ECEDF0] ml-[23.5px] mr-6 pb-4">
          <div className="py-[20px] px-6 font-bold text-xl">Захиалга</div>
          <div className="">
            <Table className="bg-[##F7F7F8] border-b-[1px] w-[1218px] rounded-none">
              <TableHeader>
                <TableRow className="bg-[#D6D8DB]">
                  <TableHead className="max-w-[191px] text-xs font-semibold px-6 text-black py-[14px]">
                    Захиалгын ID дугаар
                  </TableHead>
                  <TableHead className="max-w-[209px] text-xs font-semibold px-6 text-black py-[14px]">
                    Үйлчлүүлэгч
                  </TableHead>
                  <TableHead className="max-w-[168px] text-xs font-semibold px-6 text-black py-[14px]">
                    Огноо
                  </TableHead>
                  <TableHead className="max-w-[129px] text-xs font-semibold px-6 text-black py-[14px]">
                    Цаг
                  </TableHead>
                  <TableHead className="max-w-[137px] text-xs font-semibold px-6 text-black py-[14px]">
                    Төлбөр
                  </TableHead>
                  <TableHead className="max-w-[214px] text-xs font-semibold px-6 text-black py-[14px] text-center">
                    Статус
                  </TableHead>
                  <TableHead className="max-w-[214px] text-xs font-semibold px-6 text-black py-[14px] text-center">
                    Дэлгэрэнгүй
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadOrder.map(
                  (order: paymentType) =>
                    order && (
                  <TableRow>
                    <TableCell className=" py-[26px] max-w-[156px]">
                      <p className="text-sm font-semibold px-6">
                        #{order.orderNumber}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 max-w-[156px] flex flex-col text-left gap-2">
                      <p className="text-sm font-semibold">
                        {order.userId.userName}
                      </p>
                      <p className="text-sm font-normal text-[#3F4145]">{order.userId.email}</p>
                    </TableCell>
                    <TableCell className="px-6 max-w-[156px]">
                      {dayjs(order?.createAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell className="px-6 max-w-[156px]">
                    {dayjs(order?.createAt).format("HH:mm")}
                    </TableCell>
                    <TableCell className="px-6 py-4 max-w-[156px text-center]">
                      <div className="">
                        {order.paymentAmount}₮
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 max-w-[156px]">
                      {/* {orderStatus.map((item, index) => setSelectedStatus === item.value (
                        <div key={item.name}>
                          {item.name}
                        </div>
                      ))} */}
                      <div className="border px-[10px] py-[6px] text-center rounded-full">
                        {order.paymentStatus}
                      </div>
                    </TableCell>

                    <TableCell className=" py-4 flex gap-4 items-center justify-center">
                      <Link href={`/dashboard/OrderDetail?id=${order.userId._id}`}>
                        <ChevronRight />
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
export default Order;
