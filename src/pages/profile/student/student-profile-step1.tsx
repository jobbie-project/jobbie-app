import {ButtonHover} from '@/components/button-hover-animation';
import PasswordInput from '@/components/password';
import PasswordStrengthMeter from '@/components/password-strength-meter';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

interface FormData {
  name: string;
  lastname: string;
}

export default function StudentRegisterStep1() {
  const {register, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      name: '',
      lastname: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.name) throw new Error();
      navigate('/');
    } catch (error) {
      toast.warn('Insira seu nome.');
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl mt-20">Qual é o seu nome?</p>
          </div>
          <div className="mt-8 w-full">
            <input
              {...register('name')}
              required
              placeholder="Nome"
              type="string"
              className="text-md block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
            />
            <div className="mt-6 w-full">
              <input
                {...register('lastname')}
                required
                placeholder="Sobrenome"
                type="string"
                className="text-md block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
              />
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover
              text={'Continuar'}
              link={'/registro/estudante/passo-1'}
              type={'button'}
              className="font-semibold text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
