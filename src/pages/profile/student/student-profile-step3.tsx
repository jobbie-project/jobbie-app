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
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {setUpdateUserFatecEducation} from '@/store/slices/update-profile-data';

export default function StudentRegisterStep3() {
  const {register, handleSubmit, setValue, watch, reset} = useForm<ProfileFatecEducation>({
    defaultValues: {institution: '7'},
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const isBeingUpdated = params.get('update') === 'true';
  const {fatec_education} = useSelector((state: RootState) => {
    if (isBeingUpdated) {
      return state.updateProfileData;
    }
    return state.profileData;
  });

  const {fatec_institutions, fatec_course} = useSelector((state: RootState) => state.fatecDataSlice);

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        institution: fatec_education.institution.toString(),
        course: fatec_education.course.toString(),
        actual_cycle: fatec_education.actual_cycle.toString(),
        start_date: moment(fatec_education.start_date).format('YYYY-MM') as unknown as Date,
      });
    }
  }, [fatec_education]);

  const onSubmit = (data: ProfileFatecEducation) => {
    try {
      if (!data.actual_cycle) throw new Error('É necessário informar o ciclo atual.');
      if (!data.start_date) throw new Error('É necessário informar a data de ínicio do curso.');
      if (!data.course) throw new Error('É necessário informar o curso.');
      if (!data.institution) throw new Error('É necessário informar a instituição.');
      const payload = {
        ...data,
        institution: fatec_institutions.find(institution => institution.value === data.institution)?.value || '',
        institution_name: fatec_institutions.find(institution => institution.value === data.institution)?.label || '',
        course_name: fatec_course.find(course => course.value === data.course)?.label || '',
      };
      dispatch(isBeingUpdated ? setUpdateUserFatecEducation(payload) : setUserFatecEducation(payload));

      navigate(params.get('redirect') ?? '/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div
        className="max-w-full items-center p-5 flex flex-col mt-8
       select-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="max-w-md w-full">
            <p className="text-black font-semibold text-base select-none">Em qual instituição Fatec você estuda?</p>
          </div>
          <SelectDropdown
            callback={option => setValue('institution', option)}
            label={'Selecione sua Instituição'}
            options={fatec_institutions}
            disabled={true}
            value={watch('institution')}
            className="bg-lightgray1"
          />
          <SelectDropdown
            callback={value => setValue('course', value)}
            value={watch('course')}
            label={'Selecione seu Curso'}
            options={fatec_course}
          />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput
              register={register}
              registerName="actual_cycle"
              label="Ciclo"
              required
              className="w-48"
              defaultValue={editMode ? fatec_education.actual_cycle : ''}
            />
            <GeneralInput
              register={register}
              registerName="start_date"
              label="Data de ínicio do Curso"
              className="w-48"
              type="month"
              defaultValue={editMode ? moment(fatec_education.start_date).format('YYYY-MM') : undefined}
              required
            />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </div>
  );
}
