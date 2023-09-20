import moment from '@/utils/moment';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {SelectDropdown} from '@/components/select-dropdown';
import {RootState, useAppDispatch} from '@/store/store';
import {setUserFatecEducation} from '@/store/slices/profile-data';
import {ProfileFatecEducation} from '@/store/interfaces/profile-data-interface';
import {Courses, FatecInstitutions} from '@/utils/consts';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

export default function StudentRegisterStep3() {
  const {register, handleSubmit, setValue, watch, reset} = useForm<ProfileFatecEducation>({
    defaultValues: {institution: '7'},
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {fatecEducation} = useSelector((state: RootState) => state.profileData);
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        institution: fatecEducation.institution,
        course: fatecEducation.course,
        actual_cycle: fatecEducation.actual_cycle,
        start_date: fatecEducation.start_date,
      });
    }
  }, [fatecEducation]);

  const onSubmit = (data: ProfileFatecEducation) => {
    try {
      if (!data.actual_cycle) throw new Error('É necessário informar o ciclo atual.');
      if (!data.start_date) throw new Error('É necessário informar a data de ínicio do curso.');
      if (!data.course) throw new Error('É necessário informar o curso.');
      if (!data.institution) throw new Error('É necessário informar a instituição.');
      dispatch(
        setUserFatecEducation({
          ...data,
          institution: FatecInstitutions.find(institution => institution.value === data.institution)?.value || '',
          institution_name: FatecInstitutions.find(institution => institution.value === data.institution)?.label || '',
          course_name: Courses.find(course => course.value === data.course)?.label || '',
        }),
      );

      navigate(params.get('redirect') ?? '/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div
        className="max-w-full items-center p-5 flex flex-col mt-6
       select-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-base select-none">Em qual instituição Fatec você estuda?</p>
          </div>
          <SelectDropdown
            callback={option => setValue('institution', option)}
            label={'Selecione sua Instituição'}
            options={FatecInstitutions}
            disabled={true}
            value={watch('institution')}
            className="bg-lightgray1"
          />
          <SelectDropdown
            callback={value => setValue('course', value)}
            value={watch('course')}
            label={'Selecione seu Curso'}
            options={Courses}
          />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput
              register={register}
              registerName="actual_cycle"
              label="Ciclo"
              required
              className="w-64"
              defaultValue={editMode ? fatecEducation.actual_cycle : ''}
            />
            <GeneralInput
              register={register}
              registerName="start_date"
              label="Data de ínicio"
              className="w-64"
              type="month"
              defaultValue={editMode ? moment(fatecEducation.start_date).format('YYYY-MM') : undefined}
              required
            />
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </div>
  );
}
