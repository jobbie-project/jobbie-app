import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
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
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl mt-20 select-none">Qual é o seu nome?</p>
          </div>
          <div className="mt-8 w-full">
            <GeneralInput register={register} registerName="name" label="Nome completo" />
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-lg after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
