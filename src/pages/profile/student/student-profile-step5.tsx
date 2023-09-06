import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {RootState, useAppDispatch} from '@/store/store';
import {useSelector} from 'react-redux';
import {SelectCountry} from '@/components/select-country';
import moment from 'moment-timezone';
import {CustomCheckbox} from '@/components/custom-checkbox';
import {SelectDropdown} from '@/components/select-dropdown';
import {setUserEducation, setUserPreviousExperience} from '@/store/slices/profile-data';
import {TextBox} from '@/components/text-box';
import {useState} from 'react';

interface FormData {
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

export default function StudentRegisterStep5() {
  const [dontHaveExperience, setDontHaveExperience] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<boolean>(false);
  const {register, handleSubmit} = useForm<FormData>();
  const {previous_experience} = useSelector((state: RootState) => state.profileData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.location) throw new Error('É necessário informar a Cidade.');

      dispatch(
        setUserPreviousExperience({
          ...data,
          location: {
            city: data.location.split(',')[0],
            state: data.location.split(',')[1],
          },
        }),
      );
      navigate('/registro/estudante/passo-6');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 4, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-base select-none mt-4">Adicionando Experiência Profissional</p>
          </div>
          <CustomCheckbox className="mt-4" text="Não tenho experiência anterior" callback={setDontHaveExperience} />
          {!dontHaveExperience && (
            <>
              <SelectCountry />
              <GeneralInput label={'Cidade, Estado'} register={register} registerName="location" required />
              <GeneralInput label={'Cargo'} register={register} registerName="position" required />
              <GeneralInput label={'Nome da Empresa'} register={register} registerName="company_name" />
              <div className="w-full inline-flex mt-4 justify-between">
                <GeneralInput
                  register={register}
                  registerName="start_date"
                  label="Data de ínicio"
                  className="w-36"
                  type="month"
                  required
                />
                {!currentJob && (
                  <GeneralInput
                    register={register}
                    registerName="end_date"
                    label="Data de fim"
                    className="w-36"
                    type="month"
                    required
                  />
                )}
              </div>
              <CustomCheckbox className="mt-2" text="Emprego atual" callback={setCurrentJob} />
              <div className="text-sm font-semibold mt-4">Descrição:</div>
              <TextBox className="mt-4" />
            </>
          )}
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-redDefault" />
          </div>
        </form>
      </div>
    </div>
  );
}
