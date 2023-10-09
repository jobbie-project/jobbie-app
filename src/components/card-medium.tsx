import {HiLocationMarker} from 'react-icons/hi';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {useNavigate} from 'react-router-dom';

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
    <div className="bg-lightgray1 rounded-xl p-6 flex flex-col justify-between">
      <div onClick={handleClick} className="flex max-w-fit cursor-pointer flex-row justify-start mb-1">
        <div className="me-2 mr-6">
          <div className="bg-white text-center text-black font-semibold p-2 w-10 rounded-lg ">
            <p>
              {job.company_name
                .split(' ')
                .map((word, index) => {
                  if (index < 2) return word[0];
                })
                .join('')
                .toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="">{capitalize(job.position)}</p>
          <p className="text-xs text-slate-500 mb-3">{capitalize(job.company_name)}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <HiLocationMarker size="20" />
          <div className="ml-1 text-sm">{job.type === 'remote' ? 'Remoto' : 'Presencial'}</div>
        </div>
        <div className="flex items-baseline">
          <p className="text-xl mr-1 font-semibold">{Money(job.salary).format()}</p>
          <p className="text-sm text-slate-500">/Mensal</p>
        </div>
      </div>
    </div>
  );
}
