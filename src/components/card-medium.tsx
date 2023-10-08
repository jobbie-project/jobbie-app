import {CiLocationOn} from 'react-icons/ci';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';
import {FaReact} from 'react-icons/fa';

export function JobCardMedium({job}: {job: Job}) {
  return (
    <div className="bg-lightgray1 rounded-xl px-7 pt-5 pb-2 my-2 flex flex-col justify-between">
      <div className="flex flex-row justify-start mb-1">
        <div className=" me-2">
          <div className="bg-lightblack text-center text-white p-2 w-10 rounded-lg">
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
          <p className="">{job.position}</p>
          <p className="text-xs text-slate-500 mb-3">{job.company_name}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <CiLocationOn size="22" />
          <p className="mx-2">{job.type === 'remote' ? 'Remoto' : 'Presencial'}</p>
        </div>
        <div className="flex items-baseline">
          <p className="text-lg font-medium me-2">{Money(job.salary).format()}</p>
          <p className="text-sm text-slate-500">/Mensal</p>
        </div>
      </div>
    </div>
  );
}
