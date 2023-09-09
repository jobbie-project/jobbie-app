import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {RootState, useAppDispatch} from '@/store/store';
import {SelectCountry} from '@/components/select-country';
import moment from '@/utils/moment';
import {SelectDropdown} from '@/components/select-dropdown';
import {setUserEducation, updateUserEducation} from '@/store/slices/profile-data';
import {useEffect, useState} from 'react';
import {ProfileEducation} from '@/store/interfaces';
import {Checkbox} from '@/components/ui/checkbox';
import {useSelector} from 'react-redux';
import {ValueOption} from '@/interfaces/option';
import {Degrees} from '@/utils/consts';
import {EducationLevel} from '@/enums';

interface FormData {
  institution_name: string;
  course: string;
  degree: EducationLevel;
  start_date: Date;
  end_date?: Date;
  location: string;
}

export default function AddNewEducation() {
  const [params] = useSearchParams();
  const [currentId, setCurrentId] = useState<number>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEducation, setCurrentEducation] = useState<ProfileEducation>({} as ProfileEducation);
  const [current, setCurrent] = useState<boolean>(false);
  const {education} = useSelector((state: RootState) => state.profileData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {register, handleSubmit, setValue, reset, watch} = useForm<FormData>();

  useEffect(() => {
    if (params.get('id') !== null) {
      const id = Number(params.get('id'));
      setEditMode(true);
      setCurrentId(id);
      setCurrentEducation(education[id]);
      setCurrent(education[id].end_date === undefined);
      reset({
        institution_name: education[id].institution_name,
        course: education[id].course,
        location: `${education[id].location.city},${education[id].location.state}`,
        start_date: education[id].start_date,
        end_date: education[id].end_date ? education[id].end_date : undefined,
        degree: education[id].degree,
      });
    }
  }, [education]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.location) throw new Error('É necessário informar a Cidade.');
      if (!data.institution_name) throw new Error('É necessário informar a instituição.');
      if (!data.start_date) throw new Error('É necessário informar a data de ínicio do curso.');
      if (!data.course) throw new Error('É necessário informar o curso.');
      if (!data.degree) throw new Error('É necessário informar o grau.');
      const isAfter = moment(data.start_date).isAfter(data.end_date);
      if (isAfter) throw new Error('A data de ínicio não pode ser maior que a data de fim.');
      const isSame = moment(data.start_date).isSame(data.end_date);
      if (isSame) throw new Error('A data de ínicio não pode ser a mesma que a data de fim.');
      const userEducation = {
        ...data,
        degree: EducationLevel[data.degree],
        end_date: current ? undefined : data.end_date,
        location: {
          city: data.location.split(',')[0],
          state: data.location.split(',')[1],
        },
      };
      dispatch(
        editMode && currentId !== undefined
          ? updateUserEducation({
              index: currentId,
              education: userEducation,
            })
          : setUserEducation(userEducation),
      );

      navigate('/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-lg select-none mt-4">Adicionando nova Escolaridade</p>
          </div>
          <SelectCountry />
          <GeneralInput
            label={'Cidade, Estado'}
            register={register}
            registerName="location"
            required
            defaultValue={editMode ? `${currentEducation.location.city}, ${currentEducation.location.state}` : ''}
          />
          <GeneralInput
            label={'Nome da Instituição'}
            register={register}
            registerName="institution_name"
            required
            defaultValue={editMode ? currentEducation.institution_name : ''}
          />
          <GeneralInput
            label={'Nome do Curso'}
            register={register}
            registerName="course"
            required
            defaultValue={editMode ? currentEducation.course : ''}
          />

          <SelectDropdown
            label={'Grau'}
            options={Degrees}
            value={editMode ? currentEducation.degree : watch('degree')}
            callback={(option: string) => {
              setValue('degree', option as EducationLevel);
            }}
          />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput
              register={register}
              registerName="start_date"
              label="Data de ínicio"
              className="w-36"
              type="month"
              required
              defaultValue={editMode ? moment(currentEducation.start_date).format('YYYY-MM') : ''}
            />
            {!current && (
              <GeneralInput
                register={register}
                registerName="end_date"
                label="Data de fim"
                className="w-36"
                type="month"
                defaultValue={
                  editMode && currentEducation.end_date ? moment(currentEducation.end_date).format('YYYY-MM') : ''
                }
              />
            )}
          </div>
          <div className="flex items-center mt-4">
            <Checkbox id="current" onClick={() => setCurrent(!current)} checked={current} />
            <label htmlFor="current" className="ml-2 text-sm">
              Atualmente matriculado
            </label>
          </div>

          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-redDefault" />
          </div>
        </form>
      </div>
    </div>
  );
}
