import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {useForm} from 'react-hook-form';
import {FiTrash, FiEdit} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export default function StudentRegisterStep4() {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-sm w-full bg-lightgray1 p-4 rounded-lg text-sm">
          <div className="flex flex-row justify-between">
            Nome do curso
            <div className="flex flex-row">
              <FiEdit size={20} className="mr-1" />
              <FiTrash size={20} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mt-4">nome da faculdade</div>
            <div className="mt-4">ciclo - 10/11/1998</div>
          </div>
        </div>
        <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-base after:bg-red" />
      </div>
    </div>
  );
}
