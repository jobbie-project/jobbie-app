import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {SelectDropdown} from '@/components/select-dropdown';
import {useAppDispatch} from '@/store/store';

import {setUserFatecEducation} from '@/store/slices/profile-data';
import {ProfileFatecEducation} from '@/store/interfaces';

export default function StudentRegisterStep3() {
  const {register, handleSubmit, setValue} = useForm<ProfileFatecEducation>({
    defaultValues: {institution: '7'},
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const institutions = [
    {value: '1', label: 'Fatec Araçatuba'},
    {value: '2', label: 'Fatec Araraquara'},
    {value: '3', label: 'Fatec Barueri'},
    {value: '4', label: 'Fatec Bauru'},
    {value: '5', label: 'Fatec Botucatu'},
    {value: '6', label: 'Fatec Bragança Paulista'},
    {value: '7', label: 'Fatec Ribeirão Preto'},
  ];

  const courses = [
    {value: '1', label: 'Análise e Desenvolvimento de Sistemas'},
    {value: '2', label: 'Gestão e Inovação de Negócios'},
    {value: '3', label: 'Sistemas Biomédicos'},
  ];

  const onSubmit = (data: ProfileFatecEducation) => {
    try {
      if (!data.actual_cycle) throw new Error('É necessário informar o ciclo atual.');
      if (!data.start_date) throw new Error('É necessário informar a data de ínicio do curso.');
      if (!data.course) throw new Error('É necessário informar o curso.');
      if (!data.institution) throw new Error('É necessário informar a instituição.');
      dispatch(
        setUserFatecEducation({
          ...data,
          institution: institutions.find(institution => institution.value === data.institution)?.value || '',
          institution_name: institutions.find(institution => institution.value === data.institution)?.label || '',
          course_name: courses.find(course => course.value === data.course)?.label || '',
        }),
      );
      navigate('/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6 select-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-base select-none mt-4">
              Em qual instituição Fatec você estuda?
            </p>
          </div>
          <SelectDropdown
            callback={value => setValue('institution', value)}
            label={'Selecione sua Instituição'}
            options={institutions}
            disabled={true}
            defaultValue={institutions[6].value}
            className="bg-lightgray1"
          />
          <SelectDropdown
            callback={value => setValue('course', value)}
            label={'Selecione seu Curso'}
            options={courses}
          />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput register={register} registerName="actual_cycle" label="Ciclo" required className="w-40" />
            <GeneralInput
              register={register}
              registerName="start_date"
              label="Data de ínicio"
              className="w-40"
              type="month"
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
