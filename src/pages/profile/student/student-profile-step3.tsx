import {ButtonHover} from '@/components/button-hover-animation';
import DropdownSelection from '@/components/select-dropdown';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import GeneralInput from '@/components/general-input';

interface FormData {
  ciclo: string;
  dt_inicio: string;
}

export default function StudentRegisterStep3() {
  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      ciclo: '',
      dt_inicio: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.ciclo) throw new Error('É necessário informar o ciclo atual.');
      navigate('/registro/estudante/passo-4');
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
            <p className="text-black font-semibold text-lg select-none mt-20">Em qual instituição Fatec você estuda?</p>
          </div>
          <DropdownSelection className="mt-4 bg-lightgray1" />
          <div className="w-full inline-flex mt-8 justify-between">
            <GeneralInput register={register} registerName="ciclo" label="Ciclo" required className="w-40" />
            <GeneralInput register={register} registerName="dt_inicio" label="Data de ínicio" className="w-40" />
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
