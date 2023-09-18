import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {useAppDispatch} from '@/store/store';
import {SelectCountry} from '@/components/select-country';
import {Textarea} from '@/components/ui/textarea';
import {eraseUserPreviousExperience, setUserEducation, setUserPreviousExperience} from '@/store/slices/profile-data';
import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import moment from '@/utils/moment';
interface FormData {
  company_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  location: string;
  description: string;
}

export default function StudentRegisterStep5() {
  const [dontHaveExperience, setDontHaveExperience] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<boolean>(false);
  const {register, handleSubmit} = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    try {
      if (!dontHaveExperience) {
        if (!currentJob) {
          const isAfter = moment(data.start_date).isAfter(data.end_date);
          if (isAfter) throw new Error('A data de ínicio não pode ser maior que a data de fim.');
          const isSame = moment(data.start_date).isSame(data.end_date);
          if (isSame) throw new Error('A data de ínicio não pode ser a mesma que a data de fim.');
        }
        if (!data.location) throw new Error('É necessário informar a Cidade.');
        const city = data.location.split(',')[0];
        const state = data.location.split(',')[1];
        if (!city || !state) throw new Error('É necessário informar a Cidade e o Estado, separados por vírgula.');
        dispatch(
          setUserPreviousExperience({
            ...data,
            end_date: currentJob ? undefined : data.end_date,
            location: {
              city: data.location.split(',')[0],
              state: data.location.split(',')[1],
            },
          }),
        );
      } else {
        dispatch(eraseUserPreviousExperience());
      }
      navigate('/registro/estudante/passo-6');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 4, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col mt-6 select-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
          <p className="text-black font-semibold text-base select-none mt-4">Adicionando Experiência Profissional</p>
          <div className="flex items-center mt-6">
            <Checkbox id="noexperience" onClick={() => setDontHaveExperience(!dontHaveExperience)} />
            <label htmlFor="noexperience" className="text-sm leading-none peer-disabled:cursor-not-allowed ml-2 mt-1">
              Não tenho experiência
            </label>
          </div>
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
              <div className="flex items-center mt-4">
                <Checkbox id="current" onClick={() => setCurrentJob(!currentJob)} />
                <label htmlFor="current" className="ml-2 text-sm">
                  Emprego Atual
                </label>
              </div>
              <div className="text-sm font-semibold mt-4">Descrição:</div>
              <Textarea placeholder="Fale sobre as atividades executadas nesse cargo." className="mt-4 text-sm" />
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
