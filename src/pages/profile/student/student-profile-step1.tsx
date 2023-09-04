import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import {ProgressBar} from '@/components/progress-bar';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

interface FormData {
  name: string;
}

export default function StudentRegisterStep1() {
  const {register, handleSubmit} = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira seu nome para continuar.');
      navigate('/registro/estudante/passo-2');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 1, maxSteps: 8}} />
      <div className="max-w-full items-center flex flex-col min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl mt-10 select-none">Qual é o seu nome?</p>
          </div>
          <div className="mt-8 w-full">
            <GeneralInput register={register} registerName="name" label="Nome completo" required />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-lg after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
