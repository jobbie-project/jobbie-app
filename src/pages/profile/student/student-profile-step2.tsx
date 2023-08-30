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
            <input
              {...register('endereco')}
              required
              placeholder="Endereço"
              type="string"
              className="text-sm block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
            />
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
            <ButtonHover
              text={'Continuar'}
              link={'/registro/estudante/passo-3'}
              type={'button'}
              className="font-semibold text-lg after:bg-red"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
