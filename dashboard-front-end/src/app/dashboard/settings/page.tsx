import { DashboardAside } from "@/components/Dashboard";
import Link from "next/link";

const Settings = () => {
  return (
    <div className="flex bg-[#F7F7F8]">
      <DashboardAside />
      <div className="bg-[#FFFFFF] px-6 py-8 mt-[50px] ml-[157px] h-[50%] rounded-xl max-w-[729px] w-full flex flex-col gap-5">
        <div className="text-[#121316] text-lg">Тохиргоо</div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="flex-1">Баннер зураг </div>
            <Link
              className="border-2 px-5 py-2.5 rounded-[8px] text-[#121316] text-base"
              href={"settings/commerce-profile"}
            >
              солих
            </Link>
          </div>
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="flex-1">Эхний бүтээгдэхүүнээ нэмнэ үү</div>
            <Link
              className="border-2 px-5 py-2.5 rounded-[8px] text-[#121316] text-base"
              href={"addproduct"}
            >
              Бүтээгдэхүүн нэмэх
            </Link>
          </div>
          <div className="flex w-full p-3 border-[1px] items-center rounded-[8px]">
            <div className="flex-1">Хүргэлтийг тохируулна уу</div>
            <Link
              className="border-2 px-5 py-2.5 rounded-[8px] text-[#121316] text-base"
              href={""}
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
