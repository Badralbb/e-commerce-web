import { ArrowRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

type Props = {
  successSave: boolean;
  alertClose: () => void;
};
export const AlertDialog = ({ successSave, alertClose }: Props) => {
  return (
    <Dialog open={successSave}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[551px] p-6 flex flex-col items-center">
        <div>
          <Image
            src={"/feature.png"}
            className="w-[60px] h-[60px]"
            width={200}
            height={200}
            alt="a"
          />
        </div>
        <div className="text-[#121316] text-lg mt-4">
          Борлуулалтын төрөл амжиллтай хадгалагдлаа
        </div>
        <Button onClick={alertClose} className="flex gap-2 items-center mt-6">
          <div>Тохиргоог үргэлжлүүлэх</div>

          <ArrowRight />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
