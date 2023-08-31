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
      navigate('/registro/estudante/passo-4');
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
          <div className="w-full inline-flex mt-8">
            <div className="relative">
              <input
                required
                {...register('ciclo')}
                id="ciclo"
                name="ciclo"
                type="text"
                className="peer h-10 w-36 border-b-2 border-gray-300 text-gray-900  focus:outline-none focus:border-red"
                placeholder=""
              />
              <label
                htmlFor="ciclo"
                className="absolute left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Ciclo
              </label>
            </div>
            <div className="relative">
              <input
                required
                {...register('dt_inicio')}
                id="dt_inicio"
                type="text"
                name="dt_inicio"
                className="peer h-10 ml-12 w-36 border-b-2 select-none border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red"
                placeholder=""
              />
              <label
                htmlFor="dt_inicio"
                className="absolute left-12 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Data de ínicio
              </label>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
