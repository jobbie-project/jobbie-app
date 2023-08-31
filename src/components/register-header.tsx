import {Logoblack} from '@/icons/logo-black';
import {IoChevronBackOutline} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';
import {ProgressBar} from './progress-bar';

interface RegisterHeaderProps {
  showProgress?: {
    progress: number;
    maxSteps: number;
  };
}

export default function RegisterHeader(props: RegisterHeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-col mt-16 items-center ">
        <div className="w-full pl-4 lg:pl-0 lg:w-[640px] mt-2">
          <div onClick={() => navigate(-1)} className="cursor-pointer w-min">
            <IoChevronBackOutline size={34} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Logoblack width={'100'} height={'50'} />
        </div>
        {props.showProgress && (
          <div className="w-full flex items-center justify-center">
            <ProgressBar actualStep={props.showProgress.progress} maxSteps={props.showProgress.maxSteps} />
          </div>
        )}
      </div>
    </>
  );
}
