import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {RootState, useAppDispatch} from '@/store/store';
import {useSelector} from 'react-redux';
import {SelectCountry} from '@/components/select-country';
import moment from '@/utils/moment';
import {setUserPreviousExperience, updateUserPreviousExperience} from '@/store/slices/profile-data';
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {ProfilePreviousExperience} from '@/store/interfaces/profile-data-interface';
import Textarea from '@/components/ui/textarea';

interface FormData {
  company_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  location: string;
  description: string;
}

export default function AddNewExperience() {
  const [currentJob, setCurrentJob] = useState<boolean>(false);
  const {register, handleSubmit, reset, setValue} = useForm<FormData>();
  const {previous_experience} = useSelector((state: RootState) => state.profileData);
  const [params] = useSearchParams();
  const [currentId, setCurrentId] = useState<number>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEditingJob, setCurrentEditingJob] = useState<ProfilePreviousExperience>(
    {} as ProfilePreviousExperience,
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.get('id') !== null) {
      const id = Number(params.get('id'));
      setEditMode(true);
      setCurrentId(id);
      setCurrentEditingJob(previous_experience[id]);
      setCurrentJob(previous_experience[id].end_date === undefined);
      reset({
        company_name: previous_experience[id].company_name,
        position: previous_experience[id].position,
        location: `${previous_experience[id].location.city},${previous_experience[id].location.state}`,
        start_date: previous_experience[id].start_date,
        end_date: previous_experience[id].end_date ? previous_experience[id].end_date : undefined,
      });
    }
  }, [previous_experience]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.location) throw new Error('É necessário informar a Cidade.');
      if (!data.position) throw new Error('É necessário informar o cargo.');
      if (!currentJob) {
        const isAfter = moment(data.start_date).isAfter(data.end_date);
        if (isAfter) throw new Error('A data de ínicio não pode ser maior que a data de fim.');
        const isSame = moment(data.start_date).isSame(data.end_date);
        if (isSame) throw new Error('A data de ínicio não pode ser a mesma que a data de fim.');
      }
      const userPreviousExperience: ProfilePreviousExperience = {
        ...data,
        end_date: currentJob ? undefined : data.end_date,
        location: {
          city: data.location.split(',')[0],
          state: data.location.split(',')[1],
        },
      };
      dispatch(
        editMode && currentId !== undefined
          ? updateUserPreviousExperience({index: currentId, previousExperience: userPreviousExperience})
          : setUserPreviousExperience(userPreviousExperience),
      );

      navigate(params.get('redirect') ?? '/registro/estudante/passo-6');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 4, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col mt-6 select-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-base select-none mt-4">Adicionando Experiência Profissional</p>
          </div>

          <>
            <SelectCountry />
            <GeneralInput
              label={'Cidade, Estado'}
              register={register}
              registerName="location"
              required
              defaultValue={editMode ? `${currentEditingJob.location.city}, ${currentEditingJob.location.state}` : ''}
            />
            <GeneralInput
              label={'Cargo'}
              register={register}
              registerName="position"
              required
              defaultValue={editMode ? currentEditingJob.position : ''}
            />
            <GeneralInput
              label={'Nome da Empresa'}
              register={register}
              registerName="company_name"
              defaultValue={editMode ? currentEditingJob.company_name : ''}
            />
            <div className="w-full inline-flex mt-4 justify-between">
              <GeneralInput
                register={register}
                registerName="start_date"
                label="Data de ínicio"
                className="w-48"
                type="month"
                required
                defaultValue={editMode ? moment(currentEditingJob.start_date).format('YYYY-MM') : ''}
              />
              {!currentJob && (
                <GeneralInput
                  register={register}
                  registerName="end_date"
                  label="Data de fim"
                  className="w-48"
                  type="month"
                  required
                  defaultValue={
                    editMode && currentEditingJob.end_date ? moment(currentEditingJob.end_date).format('YYYY-MM') : ''
                  }
                />
              )}
            </div>
            <div className="flex items-center mt-4">
              <Checkbox id="current" onClick={() => setCurrentJob(!currentJob)} checked={currentJob} />
              <label htmlFor="current" className="ml-2 text-sm">
                Emprego Atual
              </label>
            </div>

            <div className="text-sm mt-4 w-full flex flex-col">
              <p className="font-semibold">Descrição:</p>
              <Textarea
                placeholder="Fale sobre as atividades executadas nesse cargo."
                className="mt-4 text-sm min-h-[100px] border border-gray-300 rounded-md p-2 w-full"
                defaultValue={editMode ? currentEditingJob.description : ''}
                callback={value => setValue('description', value)}
              />
            </div>
          </>

          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="text-base after:bg-redDefault" />
          </div>
        </form>
      </div>
    </div>
  );
}
