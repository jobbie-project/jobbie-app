import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {SelectCountry} from '@/components/select-country';
import {setUserAddress} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

interface FormData {
  street: string;
  location: string;
  zip_code: string;
}

export default function StudentRegisterStep2() {
  const {register, handleSubmit} = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.location) throw new Error('Insira a cidade em que você reside.');
      const city = data.location.split(',')[0];
      const state = data.location.split(',')[1];
      if (!city || !state) throw new Error('É necessário informar a Cidade e o Estado, separados por vírgula.');

      dispatch(
        setUserAddress({
          ...data,
          city: data.location.split(',')[0],
          state: data.location.split(',')[1],
        }),
      );
      navigate('/registro/estudante/passo-3');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 2, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-lg select-none mt-8">Qual sua localização?</p>
          </div>
          <SelectCountry />
          <GeneralInput register={register} registerName="street" label="Endereço" />
          <GeneralInput register={register} registerName="location" label="Cidade, Estado" required />
          <GeneralInput register={register} registerName="zip_code" label="Código postal" />

          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </div>
  );
}
