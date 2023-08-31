import {ButtonHover} from '@/components/button-hover-animation';
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
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl select-none mt-20">Qual sua localização?</p>
          </div>
          <div className="mt-8 w-full">
            <div className="py-2 relative">
              <input
                {...register('endereco')}
                placeholder=""
                type="text"
                className="peer h-8 border-b-2 w-full border-gray-300 text-gray-900 focus:outline-none focus:border-red"
              />
              <label
                htmlFor="endereco"
                className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Endereço
              </label>
            </div>
            <div className="mt-6 w-full">
              <input
                {...register('cidade')}
                required
                placeholder="Cidade, Estado"
                type="string"
                className="text-sm block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
              />
            </div>
            <div className="mt-6 w-full">
              <input
                {...register('cep')}
                required
                placeholder="Código postal"
                type="string"
                className="text-sm block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
              />
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-lg after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
