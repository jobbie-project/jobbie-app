import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {setUserName} from '@/store/slices/profile-data';
import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {set, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';

interface FormData {
  name: string;
  phone: string;
}

export default function StudentRegisterStep1() {
  const {register, handleSubmit, setValue} = useForm<FormData>();

  const userData = useSelector((state: RootState) => state.profileData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira seu nome para continuar.');
      dispatch(setUserName(data.name));
      navigate(params.get('redirect') ?? '/registro/estudante/passo-2');
    } catch (error) {
      toastError(error);
    }
  };

  const handlePhone = (event: string) => {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    const str = event.replace(/[^0-9]/g, '').slice(0, 11);
    const result = str.replace(regex, '($1)$2-$3');
    setValue('phone', result);
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 1, maxSteps: 8}} />
      <div className="max-w-full items-center flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-lg mt-10 select-none">Qual é o seu nome?</p>
          </div>
          <div className="mt-8 w-full">
            <GeneralInput register={register} registerName="name" label="Nome completo" required />
            <div>
              <GeneralInput register={register} registerName="phone" label="Telefone" callback={handlePhone} />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </div>
  );
}
