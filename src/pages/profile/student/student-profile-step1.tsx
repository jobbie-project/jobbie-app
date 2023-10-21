import {ButtonHover} from '@/components/button-hover-animation';
import GeneralInput from '@/components/general-input';
import RegisterHeader from '@/components/register-header';
import {useGetUserData} from '@/hooks/useGetUserData';
import {setUserName, setUserPhone} from '@/store/slices/profile-data';
import {setUpdateUserName, setUpdateUserPhone} from '@/store/slices/update-profile-data';
import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';

interface FormData {
  name: string;
  phone: string;
}

export default function StudentRegisterStep1() {
  const {register, handleSubmit, setValue, reset} = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const [editMode, setEditMode] = useState(false);
  const isBeingUpdated = params.get('update') === 'true';
  const profileData = useSelector((state: RootState) => {
    if (isBeingUpdated) {
      return state.updateProfileData;
    }
    return state.profileData;
  });

  const onSubmit = (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira seu nome para continuar.');
      dispatch(isBeingUpdated ? setUpdateUserName(data.name) : setUserName(data.name));
      if (data.phone) {
        dispatch(isBeingUpdated ? setUpdateUserPhone(data.phone) : setUserPhone(data.phone));
      }
      navigate(params.get('redirect') ?? '/registro/estudante/passo-2');
    } catch (error) {
      toastError(error);
    }
  };

  const {user, loading} = useGetUserData();

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
    }
    reset({
      name: editMode ? profileData.name : user?.name,
      phone: profileData.phone,
    });
  }, [profileData, loading]);

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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="max-w-md w-full">
            <p className="text-black font-semibold text-lg mt-10 select-none">Qual é o seu nome?</p>
          </div>
          <div className="mt-8 w-full">
            <GeneralInput
              register={register}
              registerName="name"
              label="Nome completo"
              defaultValue={editMode ? profileData.name : user?.name}
              required
            />
            <div>
              <GeneralInput
                register={register}
                registerName="phone"
                label="Telefone"
                callback={handlePhone}
                defaultValue={editMode ? profileData.phone : ''}
              />
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
