import {CiLocationOn} from 'react-icons/ci';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {JobTimes} from '@/utils/consts';
import {useNavigate} from 'react-router-dom';
export function JobCardBig({job, code}: {job: Job; code: string}) {
  const navigate = useNavigate();
  const generateCompanyName = () => {
    const array = job.company_name.split(' ');
    if (array.length === 1) return array[0][0].toUpperCase();
    const firstAndLast = array[0][0] + array[array.length - 1][0];
    return firstAndLast.toUpperCase();
  };

  const handleClick = () => {
    navigate(`/vaga/detalhes?codigo=${code}`);
  };

  return (
    <div className="bg-lightgray1 w-80 rounded-xl p-7 flex-col justify-between">
      <div className="flex flex-row justify-between mb-4">
        <div>
          <div className="bg-lightblack text-center text-white p-2 w-10 rounded-lg">
            <p>{generateCompanyName()}</p>
          </div>
        </div>
        <div className="h-min flex flex-row justify-end">
          <p className="bg-white text-sm px-3 py-2 rounded-lg mr-4">{job.contract_type}</p>
          <p className="bg-white text-sm px-3 py-2 rounded-lg">
            {JobTimes.find(jobTime => jobTime.value === job.job_time)?.label}
          </p>
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
        <button className="bg-redDefault text-white font-medium px-6 py-2 rounded-xl" onClick={handleClick}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
