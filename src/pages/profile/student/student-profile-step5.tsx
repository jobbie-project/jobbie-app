import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {SelectInput} from '@/components/select-input';
import {useNavigate, useSearchParams} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {RootState, useAppDispatch} from '@/store/store';
import {cities} from '@/utils/useCities';
import {SelectCountry} from '@/components/select-country';
import {eraseUserPreviousExperience, setUserPreviousExperience} from '@/store/slices/profile-data';
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import moment from '@/utils/moment';
import Textarea from '@/components/ui/textarea';
import {useSelector} from 'react-redux';
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
  const {register, handleSubmit, setValue, reset} = useForm<FormData>();
  const [editMode, setEditMode] = useState(false);
  const {previous_experience} = useSelector((state: RootState) => state.profileData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const id = Number(params.get('id'));

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar') && !isNaN(id)) {
      setEditMode(true);
      reset({
        company_name: previous_experience[id].company_name,
        position: previous_experience[id].position,
        start_date: previous_experience[id].start_date,
        end_date: previous_experience[id].end_date,
        location: `${previous_experience[id].location?.city}, ${previous_experience[id].location?.state}`,
        description: previous_experience[id].description,
      });
    }
  }, [previous_experience]);

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
          <p className="text-black font-semibold text-base select-none">Adicionando Experiência Profissional</p>
          <div className="flex items-center mt-6">
            <Checkbox id="noexperience" onClick={() => setDontHaveExperience(!dontHaveExperience)} />
            <label htmlFor="noexperience" className="text-sm leading-none peer-disabled:cursor-not-allowed ml-2 mt-1">
              Não tenho experiência
            </label>
          </div>
          {!dontHaveExperience && (
            <>
              <SelectCountry />
              <SelectInput
                options={cities}
                callback={value => {
                  setValue('location', value ?? '');
                }}
              />
              <GeneralInput
                label={'Cargo'}
                defaultValue={editMode ? previous_experience[id].position : ''}
                register={register}
                registerName="position"
                required
              />
              <GeneralInput
                label={'Nome da Empresa'}
                defaultValue={editMode ? previous_experience[id].company_name : ''}
                register={register}
                registerName="company_name"
              />
              <div className="w-full inline-flex mt-4 justify-between">
                <GeneralInput
                  register={register}
                  defaultValue={editMode ? moment(previous_experience[id].start_date).format() : ''}
                  registerName="start_date"
                  label="Data de ínicio"
                  className="w-64"
                  type="month"
                  required
                />
                {!currentJob && (
                  <GeneralInput
                    register={register}
                    defaultValue={editMode ? moment(previous_experience[id].end_date).format() : ''}
                    registerName="end_date"
                    label="Data de fim"
                    className="w-64"
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
              <div className="text-sm mt-4 w-full flex flex-col">
                <p className="font-semibold">Descrição:</p>
                <Textarea
                  callback={value => setValue('description', value)}
                  placeholder="Fale sobre as atividades executadas nesse cargo."
                  defaultValue={editMode ? previous_experience[id].description : ''}
                  className="mt-4 text-sm min-h-[100px] border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </>
          )}
          <div className="m-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-redDefault" />
          </div>
        </form>
      </div>
    </div>
  );
}
