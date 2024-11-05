"use client";

import { DashboardAside } from "@/components/Dashboard";
import { AlertDialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [successSave, setSuccessSave] = useState(false);
  const alertClose = () => {
    setSuccessSave(false);
  };
  const productSave = async () => {
    setLoading(true);
    fetch("http://localhost:4000/savedProduct", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    });
    setLoading(false);
  };
  return (
    <div className="flex bg-[#F7F7F8]">
      <DashboardAside />
      <div className="bg-[#FFFFFF] px-6 py-8 mt-[50px] ml-[157px] h-[50%] rounded-xl max-w-[729px] w-full flex flex-col gap-5">
        <div className="text-[#5e6477] text-lg">Дэлгүүрийн профайл үүсгэх</div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="w-3 h-3 rounded-full border-2 border-black mr-2"></div>
            <div className="flex-1">Дэлгүүрийн төрлөө оруулна уу</div>
            <div>
              <Dialog open={open}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setOpen(true)}
                    className="text-base text-[#121316] px-5 py-5"
                    variant="outline"
                  >
                    {" "}
                    Дэлгүүрийн төрөл
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[551px]">
                  <DialogHeader>
                    <DialogTitle className="text-[#121316] text-xl">
                      Та ямар төрлийн бүтээгдэхүүн борлуулах вэ?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="rounded-[8px] flex gap-1 bg-[#F7F7F8] py-3 px-2 mb-2 mt-6 items-center">
                    <Search />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="bg-[#F7F7F8] shadow-none border-none"
                      placeholder="Дэргүүрийн төрлөө оруулна уу."
                      type="text"
                    />
                  </div>
                  <div className="text-[#5E6166] text-base">
                    Жич: Та үүнийг хүссэн үедээ өөрчилж болно.
                  </div>
                  <DialogFooter className="flex gap-2">
                    <Button
                      onClick={() => setOpen(false)}
                      className="bg-[#ffffff] text-black hover:bg-slate-300"
                      type="submit"
                    >
                      Цуцлах
                    </Button>
                    <Button
                      onClick={() => {
                        productSave(), setOpen(false);
                        setSuccessSave(true);
                      }}
                      type="submit"
                    >
                      {loading && (
                        <Image
                          className="animate-spin"
                          src={"spinner.png"}
                          width={100}
                          height={100}
                          alt="a"
                        />
                      )}
                      <div>Хадгалах</div>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <AlertDialog successSave={successSave} alertClose={alertClose} />
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="w-3 h-3 rounded-full border-2 border-black mr-2"></div>

            <div className="flex-1">Эхний бүтээгдэхүүнээ нэмнэ үү</div>
            <Link
              href={"addproduct"}
              className=" text-[#121316] border-[1px] rounded-[8px] px-5 py-2.5 text-base bg-[#ffffff]"
            >
              Бүтээгдэхүүн нэмэх
            </Link>
          </div>
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="w-3 h-3 rounded-full border-2 border-black mr-2"></div>
            <div className="flex-1">Хүргэлтийг тохируулна уу</div>
            <Link
              href={""}
              className=" rounded-[8px] bg-[#ffffff] text-[#121316] border-[1px] px-5 py-2.5 text-base"
            >
              Хүргэлт тохируулах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
