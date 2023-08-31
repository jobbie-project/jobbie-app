import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

interface FormData {
  endereco: string;
  cidade: string;
  cep: string;
}

export default function StudentRegisterStep2() {
  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      endereco: '',
      cidade: '',
      cep: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.cidade) throw new Error();
      navigate('/');
    } catch (error) {
      toast.error('Insira a cidade em que você reside.');
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 2, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl select-none mt-10">Qual sua localização?</p>
          </div>
          <div className="mt-8 w-full">
            <GeneralInput register={register} registerName="endereco" label="Endereço" />
            <GeneralInput register={register} registerName="cidade" label="Cidade, Estado" required />
            <GeneralInput register={register} registerName="cep" label="Código postal" />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-lg after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
