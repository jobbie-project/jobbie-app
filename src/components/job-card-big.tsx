import {CiLocationOn} from 'react-icons/ci';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {FaReact} from 'react-icons/fa';

export function JobCardBig({job}: {job: Job}) {
  const generateCompanyName = () => {
    const array = job.company_name.split(' ');
    if (array.length === 1) return array[0][0].toUpperCase();
    const firstAndLast = array[0][0] + array[array.length - 1][0];
    return firstAndLast.toUpperCase();
  };

  return (
    <div className="bg-lightgray1 max-w-xl rounded-xl px-7 py-5 my-3 flex-col justify-between">
      <div className="flex flex-row justify-between mb-4">
        <div>
          <div className="bg-lightblack text-center text-white p-2 w-10 rounded-lg">
            <p>{generateCompanyName()}</p>
          </div>
        </div>
        <div className="h-min flex flex-row justify-end">
          <p className="bg-white  text-sm px-3 py-2 rounded-lg me-3">{job.contract_type}</p>
        </div>
      </div>
      <div>
        <p className="text-lg">{job.position}</p>
        <p className="text-sm text-slate-500 mb-3">{job.company_name}</p>
        <div className="flex flex-row items-center">
          <CiLocationOn size="22" />
          <p className="mx-2">{job.type === 'remote' ? 'Remoto' : 'Presencial'}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-baseline mr-7">
          <p className="text-lg font-medium me-2">{Money(job.salary).format()}</p>
          <p className="text-sm text-slate-500">/Mensal</p>
        </div>
        <div className="bg-redDefault text-white font-medium px-6 py-2 rounded-xl">Aplicar</div>
      </div>
    </div>
  );
}
