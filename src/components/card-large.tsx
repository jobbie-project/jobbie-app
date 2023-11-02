import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {JobType} from '@/enums';
import {useNavigate} from 'react-router-dom';
import {PeopleIcon} from '@/icons/people';
import {Job} from '@/interfaces/job';
import {Money} from '@/utils/money';

export default function CardLarge({job, code, isClosed}: {job: Job; code: string; isClosed?: boolean}) {
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
    <div onClick={handleClick}>
      <div className="w-full rounded-md px-7 mb-6 bg-lightgray1">
        <div className="flex flex-row justify-between">
          <div className="bg-white text-black font-bold flex flex-row justify-center p-2 rounded-md mt-6">
            <p className="m-auto">{job?.fatec_course?.abbreviation}</p>
          </div>
          <div className="mt-6">
            <Badge variant="default" className="mr-2">
              Estágio
            </Badge>
            <Badge variant="default">Remoto</Badge>
          </div>
        </div>
        <p className="pt-4 text-lg font-semibold">Desenvolvedor Front-End</p>
        <p className="text-xs">Lorem Ipsum S/A</p>
        <div className="mt-6 flex flex-row justify-between">
          <div className="flex flex-col items-start mb-4">
            <div className="flex flex-row mb-1">
              {' '}
              <PeopleIcon width="16" height="16" />
              <p className="text-xs font-semibold ml-2 ">
                {job.applicants.length}{' '}
                {job.applicants.length !== 1 ? 'pessoas se candidataram' : 'pessoa se candidatou'}
              </p>
            </div>
            <div className="flex flex-row items-baseline mt-2">
              <p className="text-xl mr-1 font-semibold">{Money(job.salary as unknow as number).format()}</p>
              <p className="text-sm text-slate-500">/Mensal</p>
            </div>
          </div>
          <Button
            variant="none"
            className="px-8 rounded-md bg-redDefault text-white flex flex-row items-center mb-4 mt-2">
            Aplicar
          </Button>
          {/* <div className="flex flex-row items-baseline">
            <p className="text-xl mr-1 font-semibold">{Money(job.salary as unknow as number).format()}</p>
            <p className="text-sm text-slate-500">/Mensal</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
