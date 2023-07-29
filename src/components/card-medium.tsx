import { CiLocationOn } from "react-icons/ci";
import { Job } from "@/interfaces/job";
import { Money } from "@/utils/money";
import { FaReact } from "react-icons/fa";

export function JobCardMedium(props: { job: Job }) {
  return (
    <div className="bg-gray rounded-xl px-7 pt-5 pb-2 my-2 flex flex-col justify-between">
      <div className="flex flex-row justify-start mb-1">
        <div className=" me-2">
          <div className="bg-white  p-1 rounded-lg">
            <FaReact size={30} color="#61DAFB" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="">{props.job.title}</p>
          <p className="text-xs text-slate-500 mb-3">
            {props.job.company.name}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <CiLocationOn size="22" />
          <p className="mx-2">Remoto</p>
        </div>
        <div className="flex items-baseline">
          <p className="text-lg font-medium me-2">
            {Money(props.job.salary).format()}
          </p>
          <p className="text-sm text-slate-500">/Mensal</p>
        </div>
      </div>
    </div>
  );
}
