import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {JobTimes} from '@/utils/consts';
import {useNavigate} from 'react-router-dom';
import LocationIcon from '@/icons/location';
export function JobCardBig({job, code}: {job: Job; code: string}) {
  const navigate = useNavigate();
  const generateCompanyName = () => {
    const array = job.company_name.split(' ');
    if (array.length === 1) return array[0][0].toUpperCase();
    const firstAndLast = array[0][0] + array[array.length - 1][0];
    return firstAndLast.toUpperCase();
  };
  const capitalize = (word: string) => {
    const array = word.split(' ');
    array.map((word, index) => {
      array[index] = word[0].toUpperCase() + word.slice(1);
    });
    return array.join(' ');
  };

  const handleClick = () => {
    navigate(`/vaga/detalhes?codigo=${code}`);
  };

  return (
    <div className="bg-lightgray1 w-72 rounded-md p-6">
      <div className="flex flex-row justify-between">
        <div>
          <div className="bg-white text-center text-black p-2 w-10 rounded-md">
            <p>{generateCompanyName()}</p>
          </div>
        </div>
        <div className="h-min flex flex-row justify-end">
          <p className="bg-white text-xs p-2 rounded-md mr-3 font-semibold">{job.contract_type}</p>
          <p className="bg-white text-xs p-2 rounded-md font-semibold">
            {JobTimes.find(jobTime => jobTime.value === job.job_time)?.label}
          </p>
        </div>
      </div>
      <div>
        <p className="text-base mt-2 font-semibold">{capitalize(job.position)}</p>
        <p className="text-xs mb-3">{capitalize(job.company_name)}</p>
        <div className="flex flex-row items-center mt-2">
          <LocationIcon width="16" height="16" />
          <p className="ml-1 text-xs">{job.type === 'remote' ? 'Remoto' : 'Presencial'}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-baseline mr-7 mt-4">
          <p className="text-sm font-semibold">{Money(job.salary).format()}</p>
          <p className="text-xs text-slate-500">/Mensal</p>
        </div>
        <button className="bg-redDefault text-white font-medium px-6 py-2 rounded-md" onClick={handleClick}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
