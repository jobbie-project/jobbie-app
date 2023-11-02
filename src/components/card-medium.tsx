import {HiLocationMarker} from 'react-icons/hi';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {useNavigate} from 'react-router-dom';
import {PeopleIcon} from '@/icons/people';
import LocationIcon from '@/icons/location';

export function JobCardMedium({job, code}: {job: Job; code: string}) {
  const navigate = useNavigate();
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
    <div onClick={handleClick} className="bg-lightgray1 rounded-md p-6 flex flex-col justify-between cursor-pointer">
      <div className="flex max-w-fit cursor-pointer flex-row justify-start mb-1">
        <div className="me-2 mr-6">
          <div className="bg-white text-black font-bold flex flex-row justify-center p-2 w-10 rounded-md ">
            <p className="m-auto">{job?.fatec_course?.abbreviation}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="">{capitalize(job.position)}</p>
          <p className="text-xs text-slate-500 mb-3">{capitalize(job.company_name)}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <LocationIcon width="12" height="12" />
          <div className="ml-1 text-xs font-semibold">{job.type === 'remote' ? 'REMOTO' : 'Presencial'}</div>
        </div>
      </div>
      <div className="mt-6 flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <PeopleIcon width="20" height="20" />
          <p className="text-sm ml-2 ">25 pessoas se candidataram</p>
        </div>
        <div className="flex flex-row items-baseline">
          <p className="text-xl mr-1 font-semibold">{job.salary}</p>
          <p className="text-sm text-slate-500">/Mensal</p>
        </div>
      </div>
    </div>
  );
}
