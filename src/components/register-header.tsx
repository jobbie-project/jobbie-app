import { Logoblack } from "@/icons/logo-black";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function RegisterHeader() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-row mt-16 justify-center">
        <div className="w-full ml-4 lg:ml-0 lg:w-1/2 mt-2">
          <div onClick={() => navigate(-1)}>
            <IoChevronBackOutline size={34} className="relative" />
          </div>
        </div>
        <div className="absolute flex flex-row items-center justify-between mt-20">
          <Logoblack width={"100"} height={"50"} />
        </div>
      </div>
    </>
  );
}
