import { LocationPin } from "@/icons/location-pin";
import { Job } from "@/interfaces/job";
import { Money } from "@/utils/money";
import { FaReact } from "react-icons/fa";

export function JobCardBig(props: { job: Job }) {
  const salary = 1600;
  const companyName = "Lorem ipsum S/A";
  return (
    <div className="bg-[#F4F4F5] max-w-xl  rounded-xl px-7 py-5 my-3 flex-col justify-between">
      <div className="flex flex-row justify-between mb-4">
        <div>
          <div className="bg-white p-1 rounded-lg">
            <FaReact size={30} color="#61DAFB" />
          </div>
        </div>
        <div className="h-min flex flex-row justify-end">
          <p className="bg-white  text-sm px-3 py-2 rounded-lg me-3">{props.job.category}</p>
          <p className="bg-white  text-sm px-3 py-2 rounded-lg">{props.job.sector[0]}</p>
        </div>
      </div>
      <div>
        <p className="text-lg">{props.job.title}</p>
        <p className="text-sm text-[#81879C] mb-3">{props.job.company.name}</p>
        <div className="flex flex-row items-center">
          <LocationPin height="15" width="15" />
          <p className="mx-2">Remoto</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-baseline mr-7">
          <p className="text-lg font-medium me-2">{Money(props.job.salary).format()}</p>
          <p className="text-sm text-[#81879C]">/Mensal</p>
        </div>
        <div className="bg-blue text-white font-medium px-6 py-2 rounded-xl">Aplicar</div>
      </div>
    </div>
  );
}
