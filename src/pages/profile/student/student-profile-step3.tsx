import {ButtonHover} from '@/components/button-hover-animation';
import DropdownSelection from '@/components/dropdown-select';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

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
      if (!data.ciclo) throw new Error();
      navigate('/');
    } catch (error) {
      toast.warn('É necessário informar o ciclo atual.');
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
          <div className="w-full relative mt-8">
            <input
              required
              {...register('ciclo')}
              type="string"
              placeholder="Ciclo"
              className="peer h-5 text-sm w-36 border-b-2 border-b-gray1 focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="ciclo"
              className="absolute h-10 left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Ciclo
            </label>
            <input
              required
              {...register('dt_inicio')}
              type="date"
              placeholder="Data de ínicio"
              className="ml-12 peer h-5 text-sm w-36 border-b-2 border-b-gray1 focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="dt_inicio"
              className="absolute h-10 left-45 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Data de ínicio
            </label>
          </div>
          {/* <div className="mt-8 inline-flex align-center">
            <input
              {...register('ciclo')}
              required
              placeholder="Ciclo"
              type="string"
              className="text-sm block max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
            />
            <div className="mt-8 inline-flex align-center">
              <input
                {...register('dt_inicio')}
                required
                placeholder="Data de ínicio"
                type="string"
                className="text-sm block max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
              />
            </div>
          </div> */}
          <div className="mt-12 flex justify-center">
            <ButtonHover
              text={'Continuar'}
              link={'/registro/estudante/passo-2'}
              type={'button'}
              className="font-semibold text-lg after:bg-red"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
