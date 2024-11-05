import { DashboardAside } from "@/components/Dashboard";
import { DashboardChart } from "@/components/dashboardChart";
import { DashboardTable } from "@/components/table";
import { ArrowRight, CalendarArrowDown } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex bg-[#F7F7F8]">
      <DashboardAside />
      <div className="px-6 py-[34px] flex flex-col gap-[34px] w-full">
        <div className="flex gap-6">
          <div className="flex flex-col max-w-[573px] rounded-xl px-6 py-4 gap-3 flex-1 bg-[#FFFFFF] ">
            <div className="flex gap-2 text-[#121316]">
              <div>$</div>
              <div className="text-base">Орлого</div>
            </div>
            <div className="text-[#121316] text-4xl font-bold">235,000₮</div>
            <div className="text-[#5E6166] text-base">Өнөөдөр</div>
          </div>
          <div className="flex flex-col max-w-[573px] rounded-xl bg-[#FFFFFF] px-6 py-4 flex-1 gap-3">
            <div className="flex gap-2 text-[#121316]">
              <div>
                <CalendarArrowDown />
              </div>
              <div className="text-base">Захиалга</div>
            </div>
            <div className="text-[#121316] text-4xl font-bold">58</div>
            <div className="text-[#5E6166] text-base">Өнөөдөр</div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="py-4 px-6 bg-[#FFFFFF] flex-1 max-w-[581px] rounded-xl">
            <div className="flex">
              <div className="flex-1 py-2 font-bold">Шилдэг бүтээгдэхүүн</div>
              <div>
                <ArrowRight className="font-bold" />
              </div>
            </div>
            <div className="mt-5">
              <DashboardTable />
            </div>
          </div>
          <div className="py-4 px-6 bg-[#FFFFFF] flex-1 max-w-[581px] max-h-[400px] rounded-xl">
            <DashboardChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
