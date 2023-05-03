import { LocationPin } from "@/icons/location-pin";
import { Money } from "@/utils/money";
import { FaReact } from "react-icons/fa";

export function JobCardMedium() {
  const type = "Estágio";
  const categories = ["Design"];
  const title = "Desenvolvedor Front-End";
  const salary = 1600;
  const companyName = "Lorem ipsum S/A";
  return (
    <div className="bg-[#F4F4F5] rounded-xl px-7 pt-5 pb-2 my-2 flex-col justify-between">
      <div className="flex flex-row justify-start mb-1">
        <div className=" me-2">
          <div className="bg-white  p-1 rounded-lg">
            <FaReact size={30} color="#61DAFB" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="">{title}</p>
          <p className="text-xs text-[#81879C] mb-3">{companyName}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <LocationPin height="15" width="15" />
          <p className="mx-2">Remoto</p>
        </div>
        <div className="flex items-baseline">
          <p className="text-lg font-medium me-2">{Money(salary).format()}</p>
          <p className="text-sm text-[#81879C]">/Mensal</p>
        </div>
      </div>
    </div>
  );
}
