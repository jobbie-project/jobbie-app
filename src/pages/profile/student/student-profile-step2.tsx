import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {setUserAddress} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

interface FormData {
  street: string;
  city: string;
  state: string;
  zip_code: string;
}

export default function StudentRegisterStep2() {
  const {register, handleSubmit} = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.city) throw new Error('Insira a cidade em que você reside.');
      dispatch(setUserAddress(data));
      navigate('/registro/estudante/passo-3');
    } catch (error) {
      toastError(error);
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
            <div className="font-semibold select-none">País</div>
            <div className="flex flex-row justify-between mb-6">
              <span className="select-none">Brasil</span>
              <div className="text-sm relative text-gray-400 select-none cursor-pointer">Alterar</div>
            </div>

            <GeneralInput register={register} registerName="street" label="Endereço" />
            <GeneralInput register={register} registerName="city" label="Cidade, Estado" required />
            <GeneralInput register={register} registerName="zip_code" label="Código postal" />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-lg after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
