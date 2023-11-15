import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {SelectCountry} from '@/components/select-country';
import {SelectInput} from '@/components/select-input';
import {setUserAddress} from '@/store/slices/profile-data';
import {setUpdateUserAddress} from '@/store/slices/update-profile-data';
import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {cities} from '@/utils/useCities';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
interface FormData {
  street: string;
  location: string;
  zip_code: string;
}

export default function StudentRegisterStep2() {
  const {register, handleSubmit, reset, setValue, watch} = useForm<FormData>();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const isBeingUpdated = params.get('update') === 'true';

  const profileAddress = useSelector((state: RootState) => {
    if (isBeingUpdated) {
      return state.updateProfileData.address;
    }
    return state.profileData.address;
  });

  const onSubmit = (data: FormData) => {
    try {
      if (!data.street) throw new Error('Insira seu endereço para continuar.');
      if (!data.location) throw new Error('Insira a cidade em que você reside.');
      const city = data.location.split(',')[0];
      const state = data.location.split(',')[1];
      if (!city || !state) throw new Error('É necessário informar a Cidade e o Estado, separados por vírgula.');
      if (!data.zip_code) throw new Error('Insira seu CEP para continuar.');
      const payload = {
        ...data,
        street: data.street,
        city: data.location.split(',')[0],
        state: data.location.split(',')[1],
        zip_code: data.zip_code,
      };
      dispatch(isBeingUpdated ? setUpdateUserAddress(payload) : setUserAddress(payload));
      navigate(params.get('redirect') ?? '/registro/estudante/passo-3');
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        street: profileAddress.street,
        location: `${profileAddress.city},${profileAddress.state}`,
        zip_code: profileAddress.zip_code,
      });
    }
  }, [profileAddress]);

  return (
    <div>
      <RegisterHeader showProgress={{progress: 2, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg select-none mt-8">Qual sua localização?</p>
          </div>
          <SelectCountry />
          <SelectInput
            options={cities}
            callback={value => {
              setValue('location', value ?? '');
            }}
            value={watch('location')}
          />
          <GeneralInput
            register={register}
            registerName="street"
            label="Endereço"
            defaultValue={editMode ? profileAddress.street : ''}
            required
          />

          <GeneralInput
            register={register}
            registerName="zip_code"
            label="Código postal"
            defaultValue={editMode ? profileAddress.zip_code : ''}
          />

          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </div>
  );
}
