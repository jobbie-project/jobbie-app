import { Logoblack } from "@/icons/logo-black";
import { IoChevronBackOutline } from "react-icons/io5";

export default function RegisterHeader() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-5xl mt-16 w-full flex flex-row justify-between items-center align-middle px-10">
        {/* <div className="flex flex-row justify-between max-w-3xl w-full bg-slate-500"> */}
        <IoChevronBackOutline size={34} />
        <Logoblack width={"100"} height={"50"} />
        <div />
        {/* </div> */}
      </div>
    </div>
  );
}
